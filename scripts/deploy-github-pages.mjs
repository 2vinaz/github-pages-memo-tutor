#!/usr/bin/env node
import { execFileSync, spawnSync } from 'node:child_process'
import { existsSync } from 'node:fs'
import { resolve } from 'node:path'

const args = process.argv.slice(2)
const dryRun = args.includes('--dry-run')
const repositoryName = args.find((arg) => arg !== '--dry-run')

const usage = 'Usage: node scripts/deploy-github-pages.mjs [--dry-run] <repository-name>'
const pagesSource = { branch: 'main', path: '/docs' }
const commandReference = [
  'gh auth status',
  'gh repo create <owner>/<repo> --public --source=. --remote=origin --push',
  "gh api --method POST repos/${owner}/${repoName}/pages -f 'source[branch]=main' -f 'source[path]=/docs'",
]
const steps = [
  'check-gh-auth',
  'ensure-git-commit',
  'create-or-connect-repository',
  'push-main',
  'enable-pages',
  'record-progress',
]

if (!repositoryName) {
  console.error(usage)
  process.exit(2)
}

if (!/^[A-Za-z0-9._-]+$/.test(repositoryName)) {
  console.error('저장소 이름은 영문, 숫자, 점, 밑줄, 하이픈만 쓰는 걸 권해요.')
  process.exit(2)
}

if (dryRun) {
  console.log(
    JSON.stringify(
      {
        mode: 'dry-run',
        repositoryName,
        pagesSource,
        commandReference,
        steps,
      },
      null,
      2
    )
  )
  process.exit(0)
}

function run(command, args, options = {}) {
  const result = spawnSync(command, args, {
    encoding: 'utf8',
    stdio: options.capture ? ['ignore', 'pipe', 'pipe'] : 'inherit',
  })

  if (result.error) throw new Error(`${command}: ${result.error.message}`)
  if (result.status !== 0) {
    const detail = options.capture ? result.stderr.trim() : ''
    throw new Error(`${command} ${args.join(' ')} 실패${detail ? `: ${detail}` : ''}`)
  }

  return options.capture ? result.stdout.trim() : ''
}

function tryRun(command, args) {
  return spawnSync(command, args, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] })
}

function ensureGitCommit() {
  if (!existsSync(resolve(process.cwd(), 'docs/index.html'))) {
    throw new Error('docs/index.html이 없어요. 먼저 Lesson 01을 완료하세요.')
  }

  const inside = tryRun('git', ['rev-parse', '--is-inside-work-tree'])
  if (inside.status !== 0) run('git', ['init'])

  run('git', ['branch', '-M', 'main'])
  run('git', ['add', '.'])

  const diff = tryRun('git', ['diff', '--cached', '--quiet'])
  if (diff.status !== 0) {
    run('git', ['commit', '-m', 'Create GitHub Pages memo app'])
  }
}

function ensureRepository(owner, repoName) {
  const repoFullName = `${owner}/${repoName}`
  const view = tryRun('gh', ['repo', 'view', repoFullName, '--json', 'url'])

  if (view.status !== 0) {
    run('gh', ['repo', 'create', repoFullName, '--public', '--source=.', '--remote=origin', '--push'])
    return `https://github.com/${repoFullName}`
  }

  const repoUrl = JSON.parse(view.stdout).url
  const remote = tryRun('git', ['remote', 'get-url', 'origin'])
  if (remote.status === 0) {
    run('git', ['remote', 'set-url', 'origin', repoUrl])
  } else {
    run('git', ['remote', 'add', 'origin', repoUrl])
  }
  run('git', ['push', '-u', 'origin', 'main'])
  return repoUrl
}

function enablePages(owner, repoName) {
  const endpoint = `repos/${owner}/${repoName}/pages`
  const get = tryRun('gh', ['api', endpoint])
  const method = get.status === 0 ? 'PUT' : 'POST'

  run('gh', [
    'api',
    '--method',
    method,
    endpoint,
    '-f',
    'source[branch]=main',
    '-f',
    'source[path]=/docs',
  ])

  const page = run('gh', ['api', endpoint, '--jq', '.html_url'], { capture: true })
  return page
}

try {
  run('gh', ['auth', 'status'])
  const owner = run('gh', ['api', 'user', '--jq', '.login'], { capture: true })
  ensureGitCommit()
  const repositoryUrl = ensureRepository(owner, repositoryName)
  const pagesUrl = enablePages(owner, repositoryName)

  execFileSync('node', ['scripts/progress.mjs', 'github', repositoryUrl, pagesUrl], {
    stdio: 'inherit',
  })

  console.log(
    JSON.stringify(
      {
        repositoryUrl,
        pagesUrl,
        pagesSource,
      },
      null,
      2
    )
  )
} catch (error) {
  console.error(error.message)
  console.error('')
  console.error('GitHub 로그인이 안 되어 있으면 먼저 실행하세요:')
  console.error('  gh auth login')
  console.error('')
  console.error('브라우저로 직접 하셔도 됩니다. Lesson 02의 수동 안내를 따라가세요.')
  process.exit(1)
}
