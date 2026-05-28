#!/usr/bin/env node
import { execSync } from 'node:child_process'
import { existsSync } from 'node:fs'
import { resolve } from 'node:path'

let ok = true

if (!existsSync(resolve(process.cwd(), 'docs/index.html'))) {
  console.error('docs/index.html이 없어요. Lesson 01을 먼저 완료하세요.')
  ok = false
}

try {
  const inside = execSync('git rev-parse --is-inside-work-tree', { encoding: 'utf8' }).trim()
  if (inside === 'true') console.log('Git 저장소 확인')
} catch {
  console.error('아직 Git 저장소가 아니에요.')
  ok = false
}

try {
  const remote = execSync('git remote get-url origin', { encoding: 'utf8' }).trim()
  if (/github\.com[:/]/.test(remote)) console.log(`origin 확인: ${remote}`)
  else {
    console.error('origin이 GitHub 주소가 아니에요.')
    ok = false
  }
} catch {
  console.error('origin 원격 저장소가 아직 없어요.')
  ok = false
}

if (!ok) process.exit(1)

console.log('Lesson 02 통과 — GitHub Pages 배포 설정 준비 완료')
