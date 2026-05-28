import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import { mkdtempSync, readFileSync, cpSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join, resolve } from 'node:path'
import { execFileSync } from 'node:child_process'

const root = resolve(import.meta.dirname, '..')

describe('memo app customization', () => {
  it('uses interview answers to personalize the static app', () => {
    const temp = mkdtempSync(join(tmpdir(), 'memo-tutor-customize-'))
    cpSync(root, temp, { recursive: true })

    execFileSync('node', ['scripts/progress.mjs', 'init'], { cwd: temp })
    execFileSync('node', ['scripts/progress.mjs', 'check', '0', 'appName', '회의 메모장'], { cwd: temp })
    execFileSync('node', ['scripts/progress.mjs', 'check', '0', 'memoUse', '회의 끝나고 할 일을 남기기'], { cwd: temp })
    execFileSync('node', ['scripts/progress.mjs', 'check', '0', 'audience', '운영팀 동료'], { cwd: temp })
    execFileSync('node', ['scripts/apply-template.mjs'], { cwd: temp })
    execFileSync('node', ['scripts/customize-app.mjs'], { cwd: temp })

    const html = readFileSync(join(temp, 'docs/index.html'), 'utf8')
    const css = readFileSync(join(temp, 'docs/styles.css'), 'utf8')

    assert.match(html, /회의 메모장/)
    assert.match(html, /회의 끝나고 할 일을 남기기/)
    assert.match(html, /운영팀 동료/)
    assert.match(html, /회의 끝나고 할 일을 남기기/)
    assert.match(css, /--accent: #245bdb/)
  })
})
