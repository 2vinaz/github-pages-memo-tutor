import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const root = resolve(import.meta.dirname, '..')

function file(path) {
  return readFileSync(resolve(root, path), 'utf8')
}

describe('netlify memo tutor repository', () => {
  it('contains the learner entry points and progress tooling', () => {
    assert.equal(existsSync(resolve(root, 'README.md')), true)
    assert.equal(existsSync(resolve(root, 'CLAUDE.md')), true)
    assert.equal(existsSync(resolve(root, '.claude/skills/tutor.md')), true)
    assert.equal(existsSync(resolve(root, 'scripts/progress.mjs')), true)
    assert.equal(existsSync(resolve(root, 'scripts/check.mjs')), true)
    assert.equal(existsSync(resolve(root, 'scripts/deploy-netlify.mjs')), true)
  })

  it('has a complete practical lesson flow ending in Netlify web verification', () => {
    const lessons = [
      'lessons/00-start/check.mjs',
      'lessons/01-build-memo/check.mjs',
      'lessons/02-netlify-deploy/check.mjs',
      'lessons/03-verify-web/check.mjs',
    ]

    for (const lesson of lessons) {
      assert.equal(existsSync(resolve(root, lesson)), true, lesson)
      assert.equal(existsSync(resolve(root, lesson.replace('check.mjs', 'coach.md'))), true, lesson)
    }

    assert.match(file('lessons/02-netlify-deploy/coach.md'), /Netlify/)
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

  it('documents accountless Netlify CLI deployment for the static docs folder', () => {
    assert.match(file('README.md'), /Netlify CLI/)
    assert.match(file('README.md'), /계정 없이/)
    assert.match(file('README.md'), /npm run deploy:netlify/)
    assert.match(file('lessons/02-netlify-deploy/coach.md'), /--allow-anonymous/)
    assert.match(file('lessons/02-netlify-deploy/coach.md'), /docs/)
  })

  it('guides learners through accountless Netlify CLI deployment', () => {
    const coach = file('lessons/02-netlify-deploy/coach.md')

    assert.match(coach, /Netlify CLI/)
    assert.match(coach, /계정 없이/)
    assert.match(coach, /npx --yes netlify-cli@latest deploy/)
    assert.match(coach, /--allow-anonymous/)
    assert.match(coach, /--dir docs/)
    assert.match(coach, /--no-build/)
    assert.match(coach, /--json/)
    assert.match(coach, /claim/)
    assert.doesNotMatch(coach, /gh auth/)
    assert.doesNotMatch(coach, /GitHub 계정/)
    assert.doesNotMatch(coach, /GitHub 계정 로그인/)
  })

  it('starts with a warm greeting and learner interview before building', () => {
    const lesson0 = file('lessons/00-start/coach.md')

    assert.match(lesson0, /환영/)
    assert.match(lesson0, /What/)
    assert.match(lesson0, /Who/)
    assert.match(lesson0, /Behavior/)
    assert.match(lesson0, /Errors/)
    assert.match(lesson0, /Out of Scope/)
    assert.match(lesson0, /Design/)
    assert.match(lesson0, /node scripts\/progress\.mjs check 0 what/)
    assert.match(lesson0, /node scripts\/progress\.mjs check 0 who/)
    assert.match(lesson0, /node scripts\/progress\.mjs check 0 behavior/)
    assert.match(lesson0, /node scripts\/progress\.mjs check 0 errors/)
    assert.match(lesson0, /node scripts\/progress\.mjs check 0 outOfScope/)
    assert.match(lesson0, /node scripts\/progress\.mjs check 0 design/)
  })

  it('co-builds the memo app from product and design interview answers', () => {
    const lesson1 = file('lessons/01-build-memo/coach.md')

    assert.match(lesson1, /인터뷰 답변/)
    assert.match(lesson1, /제품 기획 요약/)
    assert.match(lesson1, /디자인 방향/)
    assert.match(lesson1, /What/)
    assert.match(lesson1, /Who/)
    assert.match(lesson1, /Behavior/)
    assert.match(lesson1, /Errors/)
    assert.match(lesson1, /Out of Scope/)
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

    assert.match(readme, /제품 인터뷰/)
    assert.match(claude, /제품 인터뷰/)
    assert.match(tutor, /Lesson 00/)
    assert.match(tutor, /인터뷰/)
    assert.match(claude, /디자인/)
    assert.match(tutor, /디자인/)
  })

  it('prevents stale local progress from silently skipping the learner interview', () => {
    const readme = file('README.md')
    const claude = file('CLAUDE.md')
    const tutor = file('.claude/skills/tutor.md')
    const command = file('.claude/commands/tutor.md')

    assert.match(readme, /node scripts\/progress\.mjs reset/)
    assert.match(claude, /이전 진행 기록/)
    assert.match(tutor, /이전 진행 기록/)
    assert.match(tutor, /처음부터/)
    assert.match(tutor, /node scripts\/progress\.mjs reset/)
    assert.match(tutor, /조용히 Lesson 01로 넘어가지 않는다/)
    assert.match(command, /\/tutor/)
    assert.match(command, /이전 진행 기록/)
    assert.match(command, /처음부터/)
    assert.match(command, /이어서/)
    assert.match(command, /조용히 재개하지 않는다/)
  })

  it('does not require service login for the default deploy path', () => {
    const coach = file('lessons/02-netlify-deploy/coach.md')
    const readme = file('README.md')
    const deploy = file('scripts/deploy-netlify.mjs')

    assert.doesNotMatch(coach, /```bash\ngh auth login\n```/)
    assert.doesNotMatch(readme, /gh auth/)
    assert.doesNotMatch(deploy, /gh auth/)
    assert.doesNotMatch(coach, /netlify login/)
    assert.match(deploy, /--allow-anonymous/)
  })

  it('keeps user-facing tutor files free of GitHub deployment cues', () => {
    const userFacingFiles = [
      'README.md',
      'CLAUDE.md',
      '.claude/commands/tutor.md',
      '.claude/skills/tutor.md',
      'lessons/00-start/coach.md',
      'lessons/01-build-memo/coach.md',
      'lessons/02-netlify-deploy/coach.md',
      'lessons/03-verify-web/coach.md',
    ]

    for (const path of userFacingFiles) {
      const text = file(path)
      assert.doesNotMatch(text, /GitHub/)
      assert.doesNotMatch(text, /gh auth/)
      assert.doesNotMatch(text, /github\.io/)
    }
  })
})
