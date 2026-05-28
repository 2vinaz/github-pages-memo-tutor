#!/usr/bin/env node
import { execFileSync, spawnSync } from 'node:child_process'
import { existsSync } from 'node:fs'
import { resolve } from 'node:path'

const args = process.argv.slice(2)
const dryRun = args.includes('--dry-run')
const provider = 'netlify'
const publishDir = 'docs'
const requiresAccount = false
const commandReference = [
  'npx --yes netlify-cli@latest deploy --allow-anonymous --dir docs --no-build --json',
]
const steps = ['check-static-files', 'deploy-anonymously', 'record-progress']

if (dryRun) {
  console.log(
    JSON.stringify(
      {
        mode: 'dry-run',
        provider,
        publishDir,
        requiresAccount,
        commandReference,
        steps,
      },
      null,
      2
    )
  )
  process.exit(0)
}

try {
  ensureStaticFiles()
  const output = runNetlifyDeploy()
  const deploy = parseDeployOutput(output)
  const url = pickUrl(deploy)
  const claimUrl = pickClaimUrl(deploy)

  execFileSync('node', ['scripts/progress.mjs', 'deploy', provider, url, claimUrl ?? ''], {
    stdio: 'inherit',
  })

  console.log(
    JSON.stringify(
      {
        provider,
        url,
        claimUrl,
        publishDir,
        requiresAccount,
      },
      null,
      2
    )
  )
} catch (error) {
  console.error(error.message)
  console.error('')
  console.error('계정 없이 Netlify CLI로 다시 시도하려면 실행하세요:')
  console.error('  npx --yes netlify-cli@latest deploy --allow-anonymous --dir docs --no-build --json')
  console.error('')
  console.error('배포 URL은 공개 주소입니다. 실습용 문구만 올리고 민감한 내용은 넣지 마세요.')
  process.exit(1)
}

function ensureStaticFiles() {
  const indexPath = resolve(process.cwd(), publishDir, 'index.html')
  if (!existsSync(indexPath)) {
    throw new Error('docs/index.html이 없어요. 먼저 Lesson 01을 완료하세요.')
  }
}

function runNetlifyDeploy() {
  const result = spawnSync(
    'npx',
    ['--yes', 'netlify-cli@latest', 'deploy', '--allow-anonymous', '--dir', publishDir, '--no-build', '--json'],
    {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'pipe'],
    }
  )

  if (result.error) throw new Error(`npx: ${result.error.message}`)
  if (result.status !== 0) {
    const detail = [result.stdout.trim(), result.stderr.trim()].filter(Boolean).join('\n')
    throw new Error(`Netlify 익명 배포 실패${detail ? `:\n${detail}` : ''}`)
  }

  return result.stdout.trim()
}

function parseDeployOutput(output) {
  try {
    return JSON.parse(output)
  } catch {
    throw new Error(`Netlify 배포 결과를 읽지 못했어요:\n${output}`)
  }
}

function pickUrl(value) {
  const candidates = flattenUrls(value)
  const preferred = candidates.find((url) => /netlify\.app/.test(url))
  const url = preferred ?? candidates[0]
  if (!url) throw new Error('Netlify 배포 URL을 찾지 못했어요.')
  return url
}

function pickClaimUrl(value) {
  return flattenUrls(value).find((url) => /claim|app\.netlify\.com/.test(url))
}

function flattenUrls(value) {
  const urls = []
  collectUrls(value, urls)
  return urls
}

function collectUrls(value, urls) {
  if (!value) return
  if (typeof value === 'string') {
    if (/^https?:\/\//.test(value)) urls.push(value)
    return
  }
  if (Array.isArray(value)) {
    for (const item of value) collectUrls(item, urls)
    return
  }
  if (typeof value === 'object') {
    for (const item of Object.values(value)) collectUrls(item, urls)
  }
}
