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
    execFileSync('node', ['scripts/progress.mjs', 'check', '0', 'what', '회의 후 할 일을 빠르게 정리하는 메모 앱'], { cwd: temp })
    execFileSync('node', ['scripts/progress.mjs', 'check', '0', 'who', '매주 회의를 정리하는 운영팀 리더'], { cwd: temp })
    execFileSync('node', ['scripts/progress.mjs', 'check', '0', 'behavior', '입력하면 목록에 추가되고, 완료 체크하면 아래로 정리된다'], { cwd: temp })
    execFileSync('node', ['scripts/progress.mjs', 'check', '0', 'errors', '빈 메모를 저장하면 "내용을 먼저 적어주세요"라고 알려준다'], { cwd: temp })
    execFileSync('node', ['scripts/progress.mjs', 'check', '0', 'outOfScope', '로그인과 팀 동기화는 만들지 않는다'], { cwd: temp })
    execFileSync('node', ['scripts/progress.mjs', 'check', '0', 'design', '차분한 파랑, 업무툴처럼 단정한 디자인'], { cwd: temp })
    execFileSync('node', ['scripts/apply-template.mjs'], { cwd: temp })
    execFileSync('node', ['scripts/customize-app.mjs'], { cwd: temp })

    const html = readFileSync(join(temp, 'docs/index.html'), 'utf8')
    const css = readFileSync(join(temp, 'docs/styles.css'), 'utf8')

    assert.match(html, /회의 후 할 일을 빠르게 정리하는 메모 앱/)
    assert.match(html, /매주 회의를 정리하는 운영팀 리더/)
    assert.match(html, /입력하면 목록에 추가되고/)
    assert.match(html, /내용을 먼저 적어주세요/)
    assert.match(html, /로그인과 팀 동기화는 만들지 않는다/)
    assert.match(html, /제품 기획 요약/)
    assert.match(html, /디자인 방향/)
    assert.match(css, /--accent: #245bdb/)
    assert.match(css, /--panel: #ffffff/)
  })
})
