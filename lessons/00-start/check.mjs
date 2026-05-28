#!/usr/bin/env node
import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const progressPath = resolve(process.cwd(), '.progress.json')

if (!existsSync(progressPath)) {
  console.error('진행 파일이 아직 없어요. node scripts/progress.mjs init 을 먼저 실행하세요.')
  process.exit(1)
}

const progress = JSON.parse(readFileSync(progressPath, 'utf8'))
const checks = progress.lessons?.['0']?.checks ?? {}
const missing = ['appName', 'memoUse', 'audience'].filter((key) => !checks[key])

if (missing.length > 0) {
  console.error(`Lesson 00 인터뷰 답변이 부족해요: ${missing.join(', ')}`)
  process.exit(1)
}

console.log('Lesson 00 통과 — 환영 + 인터뷰 완료')
