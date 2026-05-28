import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const root = resolve(import.meta.dirname, '..')

function file(path) {
  return readFileSync(resolve(root, path), 'utf8')
}

describe('github-pages memo tutor repository', () => {
  it('contains the learner entry points and progress tooling', () => {
    assert.equal(existsSync(resolve(root, 'README.md')), true)
    assert.equal(existsSync(resolve(root, 'CLAUDE.md')), true)
    assert.equal(existsSync(resolve(root, '.claude/skills/tutor.md')), true)
    assert.equal(existsSync(resolve(root, 'scripts/progress.mjs')), true)
    assert.equal(existsSync(resolve(root, 'scripts/check.mjs')), true)
    assert.equal(existsSync(resolve(root, 'scripts/deploy-github-pages.mjs')), true)
  })

  it('has a complete practical lesson flow ending in GitHub Pages verification', () => {
    const lessons = [
      'lessons/00-start/check.mjs',
      'lessons/01-build-memo/check.mjs',
      'lessons/02-github-pages/check.mjs',
      'lessons/03-verify-web/check.mjs',
    ]

    for (const lesson of lessons) {
      assert.equal(existsSync(resolve(root, lesson)), true, lesson)
      assert.equal(existsSync(resolve(root, lesson.replace('check.mjs', 'coach.md'))), true, lesson)
    }

    assert.match(file('lessons/02-github-pages/coach.md'), /GitHub Pages/)
    assert.match(file('lessons/03-verify-web/coach.md'), /웹으로 확인/)
  })

  it('ships a deployable static memo app template', () => {
    assert.equal(existsSync(resolve(root, 'lessons/01-build-memo/template/docs/index.html')), true)
    assert.equal(existsSync(resolve(root, 'lessons/01-build-memo/template/docs/styles.css')), true)
    assert.equal(existsSync(resolve(root, 'lessons/01-build-memo/template/docs/app.js')), true)

    assert.match(file('lessons/01-build-memo/template/docs/index.html'), /<main/)
    assert.match(file('lessons/01-build-memo/template/docs/app.js'), /localStorage/)
    assert.match(file('lessons/01-build-memo/template/docs/app.js'), /memo-app:v1/)
  })

  it('documents a GitHub Pages source that works without a build process', () => {
    assert.match(file('README.md'), /main branch.*docs folder/i)
    assert.match(file('README.md'), /gh auth login/)
    assert.match(file('README.md'), /npm run deploy:pages -- memo-pages/)
    assert.match(file('lessons/02-github-pages/coach.md'), /Settings/)
    assert.match(file('lessons/02-github-pages/coach.md'), /Pages/)
  })

  it('guides learners through GitHub account, repository, and Pages setup', () => {
    const coach = file('lessons/02-github-pages/coach.md')

    assert.match(coach, /gh auth status/)
    assert.match(coach, /gh auth login/)
    assert.match(coach, /GitHub 계정/)
    assert.match(coach, /새 저장소/)
    assert.match(coach, /gh repo create/)
    assert.match(coach, /Settings.*Pages/s)
    assert.match(coach, /Deploy from a branch/)
    assert.match(coach, /main.*\/docs/s)
  })
})
