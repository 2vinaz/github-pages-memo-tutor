#!/usr/bin/env node
import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const root = process.cwd()
const required = ['docs/index.html', 'docs/styles.css', 'docs/app.js']
let ok = true

for (const path of required) {
  if (!existsSync(resolve(root, path))) {
    console.error(`${path} 파일이 없어요.`)
    ok = false
  } else {
    console.log(`${path} 확인`)
  }
}

if (ok) {
  const html = readFileSync(resolve(root, 'docs/index.html'), 'utf8')
  const js = readFileSync(resolve(root, 'docs/app.js'), 'utf8')

  if (!html.includes('<main')) {
    console.error('index.html에 앱 본문이 없어요.')
    ok = false
  }
  if (!js.includes('localStorage') || !js.includes('memo-app:v1')) {
    console.error('app.js에 브라우저 저장소 로직이 없어요.')
    ok = false
  }
}

if (!ok) process.exit(1)

console.log('Lesson 01 통과 — GitHub Pages용 메모 앱 파일 준비 완료')
