import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import { execFileSync } from 'node:child_process'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const root = resolve(import.meta.dirname, '..')
const scriptPath = resolve(root, 'scripts/deploy-netlify.mjs')

describe('Netlify anonymous deployment helper', () => {
  it('prints a safe dry-run plan without touching Netlify', () => {
    const output = execFileSync('node', [scriptPath, '--dry-run'], {
      cwd: root,
      encoding: 'utf8',
    })

    const plan = JSON.parse(output)
    assert.equal(plan.mode, 'dry-run')
    assert.equal(plan.provider, 'netlify')
    assert.equal(plan.publishDir, 'docs')
    assert.equal(plan.requiresAccount, false)
    assert.deepEqual(plan.steps, [
      'check-static-files',
      'deploy-anonymously',
      'record-progress',
    ])
  })

  it('contains the exact Netlify CLI command the tutor explains', () => {
    const source = readFileSync(scriptPath, 'utf8')

    assert.match(source, /netlify-cli@latest/)
    assert.match(source, /--allow-anonymous/)
    assert.match(source, /--dir/)
    assert.match(source, /docs/)
    assert.match(source, /--no-build/)
    assert.match(source, /--json/)
    assert.doesNotMatch(source, /netlify login/)
    assert.doesNotMatch(source, /gh auth/)
  })
})
