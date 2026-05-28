#!/usr/bin/env node
import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'

let ok = true

if (!existsSync(resolve(process.cwd(), 'docs/index.html'))) {
  console.error('docs/index.html이 없어요. Lesson 01을 먼저 완료하세요.')
  ok = false
}

const progressPath = resolve(process.cwd(), '.progress.json')
if (!existsSync(progressPath)) {
  console.error('.progress.json이 없어요. 먼저 진도를 초기화하세요.')
  ok = false
}

if (ok) {
  const progress = JSON.parse(readFileSync(progressPath, 'utf8'))
  const provider = progress.deployment?.provider
  const url = progress.deployment?.url ?? progress.github?.pagesUrl

  if (provider !== 'netlify') {
    console.error('Netlify 배포 기록이 아직 없어요.')
    ok = false
  }
  if (!/^https:\/\/.+\.netlify\.app/.test(url ?? '')) {
    console.error('netlify.app 배포 URL이 아직 기록되지 않았어요.')
    ok = false
  } else {
    console.log(`Netlify 배포 URL 확인: ${url}`)
  }
}

if (!ok) process.exit(1)

console.log('Lesson 02 통과 — Netlify CLI 익명 배포 완료')
