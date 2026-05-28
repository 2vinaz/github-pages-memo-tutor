#!/usr/bin/env node
import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const progressPath = resolve(process.cwd(), '.progress.json')

if (!existsSync(progressPath)) {
  console.error('.progress.json이 없어요.')
  process.exit(1)
}

let progress
try {
  progress = JSON.parse(readFileSync(progressPath, 'utf8'))
} catch {
  console.error('.progress.json을 읽을 수 없어요.')
  process.exit(1)
}

const url = progress.github?.pagesUrl
if (!url || !/^https:\/\/.+\.github\.io\/.+/.test(url)) {
  console.error('GitHub Pages URL이 기록되지 않았어요.')
  process.exit(1)
}

try {
  const response = await fetch(url)
  if (!response.ok) {
    console.error(`웹 응답이 ${response.status}예요. Pages 배포가 아직 진행 중일 수 있어요.`)
    process.exit(1)
  }
  const body = await response.text()
  if (!body.includes('내 메모')) {
    console.error('웹페이지는 열렸지만 메모 앱 본문을 찾지 못했어요.')
    process.exit(1)
  }
  console.log(`Lesson 03 통과 — 웹으로 확인 완료: ${url}`)
} catch {
  console.error('GitHub Pages 주소에 아직 접속할 수 없어요. 잠시 후 다시 확인하세요.')
  process.exit(1)
}
