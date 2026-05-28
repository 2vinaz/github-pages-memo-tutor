import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import { execFileSync } from 'node:child_process'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const root = resolve(import.meta.dirname, '..')
const scriptPath = resolve(root, 'scripts/deploy-github-pages.mjs')

describe('GitHub Pages deployment helper', () => {
  it('prints a safe dry-run plan without touching GitHub', () => {
    const output = execFileSync('node', [scriptPath, '--dry-run', 'memo-pages'], {
      cwd: root,
      encoding: 'utf8',
    })

    const plan = JSON.parse(output)
    assert.equal(plan.mode, 'dry-run')
    assert.equal(plan.repositoryName, 'memo-pages')
    assert.deepEqual(plan.pagesSource, { branch: 'main', path: '/docs' })
    assert.deepEqual(plan.steps, [
      'check-gh-auth',
      'ensure-git-commit',
      'create-or-connect-repository',
      'push-main',
      'enable-pages',
      'record-progress',
    ])
  })

  it('contains the exact GitHub CLI and Pages API commands the tutor explains', () => {
    const source = readFileSync(scriptPath, 'utf8')

    assert.match(source, /gh auth status/)
    assert.match(source, /gh repo create/)
    assert.match(source, /--public/)
    assert.match(source, /repos\/\$\{owner\}\/\$\{repoName\}\/pages/)
    assert.match(source, /source\[branch\]=main/)
    assert.match(source, /source\[path\]=\/docs/)
  })
})
