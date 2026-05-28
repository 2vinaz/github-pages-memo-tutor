#!/usr/bin/env node
import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

const root = process.cwd()
const progressPath = resolve(root, '.progress.json')
const htmlPath = resolve(root, 'docs/index.html')
const cssPath = resolve(root, 'docs/styles.css')

if (!existsSync(progressPath)) {
  console.error('.progress.json이 없어요. Lesson 00 인터뷰를 먼저 진행하세요.')
  process.exit(1)
}

if (!existsSync(htmlPath) || !existsSync(cssPath)) {
  console.error('docs 앱 파일이 없어요. node scripts/apply-template.mjs 를 먼저 실행하세요.')
  process.exit(1)
}

const progress = JSON.parse(readFileSync(progressPath, 'utf8'))
const checks = progress.lessons?.['0']?.checks ?? {}

const appName = clean(checks.appName) || '내 메모'
const memoUse = clean(checks.memoUse) || '오늘 남길 메모를 적어보세요'
const audience = clean(checks.audience) || '나'

let html = readFileSync(htmlPath, 'utf8')
html = html
  .replaceAll('내 메모', escapeHtml(appName))
  .replaceAll('오늘 남길 메모를 적어보세요', escapeHtml(memoUse))
  .replace(
    '<p class="status" id="memo-status">0개 저장됨</p>',
    `<p class="status" id="memo-status">0개 저장됨</p>\n        <p class="audience">${escapeHtml(audience)}를 위한 메모 앱</p>`
  )

let css = readFileSync(cssPath, 'utf8')
css = css
  .replace('--accent: #147d73;', '--accent: #245bdb;')
  .replace('--accent-strong: #0f5f58;', '--accent-strong: #1d4ed8;')

if (!css.includes('.audience')) {
  css += `

.audience {
  margin: 6px 0 0;
  color: var(--muted);
  font-size: 0.92rem;
}
`
}

writeFileSync(htmlPath, html)
writeFileSync(cssPath, css)

console.log(`인터뷰 답변을 반영했어요: ${appName}`)

function clean(value) {
  return typeof value === 'string' ? value.trim() : ''
}

function escapeHtml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
}
