#!/usr/bin/env node
import { existsSync } from 'node:fs'
import { resolve } from 'node:path'

if (!existsSync(resolve(process.cwd(), '.progress.json'))) {
  console.error('진행 파일이 아직 없어요. node scripts/progress.mjs init 을 먼저 실행하세요.')
  process.exit(1)
}

console.log('Lesson 00 통과 — 바로 실전 시작 준비 완료')
