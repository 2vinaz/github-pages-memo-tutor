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
    assert.match(coach, /gh auth login --web --clipboard --git-protocol https/)
    assert.match(coach, /Ctrl\+C/)
    assert.match(coach, /대화형/)
    assert.match(coach, /GitHub 계정/)
    assert.match(coach, /새 저장소/)
    assert.match(coach, /gh repo create/)
    assert.match(coach, /Settings.*Pages/s)
    assert.match(coach, /Deploy from a branch/)
    assert.match(coach, /main.*\/docs/s)
  })

  it('starts with a warm greeting and learner interview before building', () => {
    const lesson0 = file('lessons/00-start/coach.md')

    assert.match(lesson0, /환영/)
    assert.match(lesson0, /바로 만들기 전에/)
    assert.match(lesson0, /어떤 메모/)
    assert.match(lesson0, /누가 쓸/)
    assert.match(lesson0, /node scripts\/progress\.mjs check 0 appName/)
    assert.match(lesson0, /node scripts\/progress\.mjs check 0 memoUse/)
    assert.match(lesson0, /node scripts\/progress\.mjs check 0 audience/)
  })

  it('co-builds the memo app from interview answers instead of blindly copying it', () => {
    const lesson1 = file('lessons/01-build-memo/coach.md')

    assert.match(lesson1, /인터뷰 답변/)
    assert.match(lesson1, /앱 이름/)
    assert.match(lesson1, /placeholder/)
    assert.match(lesson1, /함께 정한/)
    assert.match(lesson1, /node scripts\/customize-app\.mjs/)
    assert.doesNotMatch(lesson1, /질문 없이/)
  })

  it('keeps the top-level tutor instructions aligned with conversational building', () => {
    const readme = file('README.md')
    const claude = file('CLAUDE.md')
    const tutor = file('.claude/skills/tutor.md')

    for (const text of [readme, claude, tutor]) {
      assert.doesNotMatch(text, /질문 없이/)
      assert.doesNotMatch(text, /사전 질문 없이/)
      assert.doesNotMatch(text, /앞 질문 없이/)
    }

    assert.match(readme, /짧은 인터뷰/)
    assert.match(claude, /짧은 인터뷰/)
    assert.match(tutor, /Lesson 00/)
    assert.match(tutor, /인터뷰/)
  })

  it('does not tell the tutor to run raw interactive gh auth login', () => {
    const coach = file('lessons/02-github-pages/coach.md')
    const readme = file('README.md')
    const deploy = file('scripts/deploy-github-pages.mjs')

    assert.doesNotMatch(coach, /```bash\ngh auth login\n```/)
    assert.doesNotMatch(readme, /```bash\ngh auth status\ngh auth login\n/)
    assert.match(deploy, /gh auth login --web --clipboard --git-protocol https/)
  })
})
