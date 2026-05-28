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

const what = answer('what', 'appName', '내 메모')
const who = answer('who', 'audience', '나')
const behavior = answer('behavior', 'memoUse', '메모를 입력하면 목록에 저장된다')
const errors = answer('errors', null, '빈 메모를 저장하면 내용을 먼저 적어달라고 알려준다')
const outOfScope = answer('outOfScope', null, '로그인과 동기화는 이번 버전에서 만들지 않는다')
const design = answer('design', null, '차분하고 단정한 기본 디자인')
const theme = selectTheme(design)

let html = readFileSync(htmlPath, 'utf8')
html = html
  .replaceAll('내 메모', escapeHtml(what))
  .replaceAll('오늘 남길 메모를 적어보세요', escapeHtml(placeholderFrom(behavior)))
  .replace(
    '<p class="status" id="memo-status">0개 저장됨</p>',
    `<p class="status" id="memo-status">0개 저장됨</p>\n        <p class="audience">${escapeHtml(who)}를 위한 메모 앱</p>`
  )

if (!html.includes('class="product-brief"')) {
  html = html.replace(
    '      </header>',
    `      </header>\n\n${productBriefHtml({ what, who, behavior, errors, outOfScope, design })}`
  )
}

let css = readFileSync(cssPath, 'utf8')
css = css
  .replace('--bg: #f7f4ef;', `--bg: ${theme.bg};`)
  .replace('--line: #d8d0c4;', `--line: ${theme.line};`)
  .replace('--panel: #fffdf9;', `--panel: ${theme.panel};`)
  .replace('--accent: #147d73;', `--accent: ${theme.accent};`)
  .replace('--accent-strong: #0f5f58;', `--accent-strong: ${theme.accentStrong};`)
  .replace('--warm: #c75f45;', `--warm: ${theme.warm};`)
  .replace(
    'linear-gradient(180deg, rgba(20, 125, 115, 0.10), transparent 280px),',
    `linear-gradient(180deg, ${theme.wash}, transparent 280px),`
  )

if (!css.includes('.product-brief')) {
  css += `

.audience {
  margin: 6px 0 0;
  color: var(--muted);
  font-size: 0.92rem;
}

.product-brief {
  display: grid;
  gap: 14px;
  margin: 0 0 18px;
  padding: 18px;
  background: var(--panel);
  border: 1px solid var(--line);
  border-radius: 8px;
  box-shadow: 0 10px 30px rgba(31, 41, 51, 0.08);
}

.brief-kicker {
  margin: 0 0 6px;
  color: var(--warm);
  font-size: 0.78rem;
  font-weight: 800;
  text-transform: uppercase;
}

.product-brief h2 {
  margin: 0;
  font-size: 1.1rem;
}

.product-brief dl {
  display: grid;
  gap: 10px;
  margin: 0;
}

.product-brief div {
  display: grid;
  grid-template-columns: 112px 1fr;
  gap: 10px;
}

.product-brief dt {
  color: var(--muted);
  font-weight: 800;
}

.product-brief dd {
  margin: 0;
  overflow-wrap: anywhere;
}

@media (max-width: 560px) {
  .product-brief div {
    grid-template-columns: 1fr;
    gap: 3px;
  }
}
`
}

writeFileSync(htmlPath, html)
writeFileSync(cssPath, css)

console.log(`제품 인터뷰와 디자인 답변을 반영했어요: ${what}`)

function answer(primaryKey, fallbackKey, defaultValue) {
  return clean(checks[primaryKey]) || clean(checks[fallbackKey]) || defaultValue
}

function clean(value) {
  return typeof value === 'string' ? value.trim() : ''
}

function placeholderFrom(behavior) {
  if (behavior.includes('할 일')) return '할 일을 적고 저장하세요'
  if (behavior.includes('아이디어')) return '아이디어를 적고 저장하세요'
  if (behavior.includes('회의')) return '회의 메모를 적고 저장하세요'
  return '메모를 적고 저장하세요'
}

function productBriefHtml({ what, who, behavior, errors, outOfScope, design }) {
  return `      <section class="product-brief" aria-labelledby="brief-title">
        <div>
          <p class="brief-kicker">제품 기획 요약</p>
          <h2 id="brief-title">함께 정한 제품 기준</h2>
        </div>
        <dl>
          ${briefRow('What', what)}
          ${briefRow('Who', who)}
          ${briefRow('Behavior', behavior)}
          ${briefRow('Errors', errors)}
          ${briefRow('Out of Scope', outOfScope)}
          ${briefRow('Design', `디자인 방향: ${design}`)}
        </dl>
      </section>`
}

function briefRow(label, value) {
  return `<div><dt>${label}</dt><dd>${escapeHtml(value)}</dd></div>`
}

function selectTheme(design) {
  const text = design.toLowerCase()
  if (/파랑|업무|단정|프로페셔널|professional/.test(text)) {
    return {
      bg: '#f5f7fb',
      line: '#d7deea',
      panel: '#ffffff',
      accent: '#245bdb',
      accentStrong: '#1d4ed8',
      warm: '#5b6b82',
      wash: 'rgba(36, 91, 219, 0.10)',
    }
  }

  if (/밝|친근|노트|개인|friendly/.test(text)) {
    return {
      bg: '#fff7ed',
      line: '#f2d8bd',
      panel: '#fffdf8',
      accent: '#e85d04',
      accentStrong: '#c2410c',
      warm: '#0f766e',
      wash: 'rgba(232, 93, 4, 0.10)',
    }
  }

  if (/미니멀|minimal|여백|심플/.test(text)) {
    return {
      bg: '#f8fafc',
      line: '#d9e2ec',
      panel: '#ffffff',
      accent: '#334155',
      accentStrong: '#111827',
      warm: '#64748b',
      wash: 'rgba(51, 65, 85, 0.08)',
    }
  }

  return {
    bg: '#f7f4ef',
    line: '#d8d0c4',
    panel: '#fffdf9',
    accent: '#147d73',
    accentStrong: '#0f5f58',
    warm: '#c75f45',
    wash: 'rgba(20, 125, 115, 0.10)',
  }
}

function escapeHtml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
}
