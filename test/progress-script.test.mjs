import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import { cpSync, mkdtempSync, readFileSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import { tmpdir } from 'node:os'
import { join, resolve } from 'node:path'

const root = resolve(import.meta.dirname, '..')

function readProgress(cwd) {
  return JSON.parse(readFileSync(join(cwd, '.progress.json'), 'utf8'))
}

describe('progress script', () => {
  it('can reset stale learner answers before a fresh tutor run', () => {
    const temp = mkdtempSync(join(tmpdir(), 'memo-tutor-progress-'))
    cpSync(root, temp, { recursive: true })

    execFileSync('node', ['scripts/progress.mjs', 'init'], { cwd: temp })
    execFileSync('node', ['scripts/progress.mjs', 'check', '0', 'what', '회의 후 할 일을 빠르게 정리하는 메모 앱'], { cwd: temp })
    execFileSync('node', ['scripts/progress.mjs', 'check', '0', 'who', '운영팀 동료'], { cwd: temp })
    execFileSync('node', ['scripts/progress.mjs', 'check', '0', 'behavior', '메모를 저장하면 목록에 추가된다'], { cwd: temp })
    execFileSync('node', ['scripts/progress.mjs', 'complete', '0'], { cwd: temp })

    execFileSync('node', ['scripts/progress.mjs', 'reset'], { cwd: temp })

    const progress = readProgress(temp)
    assert.equal(progress.currentLesson, 0)
    assert.equal(progress.currentStep, 'step1')
    assert.deepEqual(progress.completed, [])
    assert.deepEqual(progress.lessons, {})
    assert.deepEqual(progress.github, { repositoryUrl: null, pagesUrl: null })
  })
})
