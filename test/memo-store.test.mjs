import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import { createMemo, createMemoStore, sortMemos } from '../lessons/01-build-memo/template/docs/app.js'

function memoryStorage() {
  const data = new Map()
  return {
    getItem(key) {
      return data.has(key) ? data.get(key) : null
    },
    setItem(key, value) {
      data.set(key, String(value))
    },
    removeItem(key) {
      data.delete(key)
    },
  }
}

describe('memo app storage', () => {
  it('creates trimmed memos with stable fields', () => {
    const memo = createMemo('  첫 메모  ', 10)

    assert.equal(memo.text, '첫 메모')
    assert.equal(memo.id, 'memo-10')
    assert.equal(memo.pinned, false)
    assert.equal(memo.done, false)
  })

  it('adds, toggles, removes, and reloads memos from localStorage', () => {
    const storage = memoryStorage()
    const store = createMemoStore(storage)

    const first = store.add('배포 설정하기', 1)
    const second = store.add('웹으로 확인하기', 2)
    store.togglePinned(second.id)
    store.toggleDone(first.id)

    assert.deepEqual(
      store.list().map((memo) => [memo.text, memo.pinned, memo.done]),
      [
        ['웹으로 확인하기', true, false],
        ['배포 설정하기', false, true],
      ]
    )

    const reloaded = createMemoStore(storage)
    assert.equal(reloaded.list().length, 2)

    reloaded.remove(first.id)
    assert.deepEqual(reloaded.list().map((memo) => memo.text), ['웹으로 확인하기'])
  })

  it('sorts pinned memos first and newest memos next', () => {
    const memos = [
      { id: 'a', pinned: false, createdAt: '2026-01-01T00:00:00.000Z' },
      { id: 'b', pinned: true, createdAt: '2026-01-02T00:00:00.000Z' },
      { id: 'c', pinned: false, createdAt: '2026-01-03T00:00:00.000Z' },
    ]

    assert.deepEqual(sortMemos(memos).map((memo) => memo.id), ['b', 'c', 'a'])
  })
})
