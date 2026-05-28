const STORAGE_KEY = 'memo-app:v1'

export function createMemo(text, now = Date.now()) {
  return {
    id: `memo-${now}`,
    text: text.trim(),
    pinned: false,
    done: false,
    createdAt: new Date(now).toISOString(),
  }
}

export function sortMemos(memos) {
  return [...memos].sort((a, b) => {
    if (a.pinned !== b.pinned) return a.pinned ? -1 : 1
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  })
}

export function createMemoStore(storage = globalThis.localStorage) {
  let memos = load(storage)

  function save() {
    storage.setItem(STORAGE_KEY, JSON.stringify(memos))
  }

  return {
    list() {
      return sortMemos(memos)
    },
    add(text, now = Date.now()) {
      const trimmed = text.trim()
      if (!trimmed) return null
      const memo = createMemo(trimmed, now)
      memos = [memo, ...memos]
      save()
      return memo
    },
    togglePinned(id) {
      memos = memos.map((memo) =>
        memo.id === id ? { ...memo, pinned: !memo.pinned } : memo
      )
      save()
    },
    toggleDone(id) {
      memos = memos.map((memo) =>
        memo.id === id ? { ...memo, done: !memo.done } : memo
      )
      save()
    },
    remove(id) {
      memos = memos.filter((memo) => memo.id !== id)
      save()
    },
    clearDone() {
      memos = memos.filter((memo) => !memo.done)
      save()
    },
  }
}

function load(storage) {
  try {
    const parsed = JSON.parse(storage.getItem(STORAGE_KEY) ?? '[]')
    if (!Array.isArray(parsed)) return []
    return parsed.filter((memo) => typeof memo?.id === 'string' && typeof memo?.text === 'string')
  } catch {
    return []
  }
}

function mount() {
  const form = document.querySelector('#memo-form')
  const input = document.querySelector('#memo-input')
  const list = document.querySelector('#memo-list')
  const empty = document.querySelector('#empty-message')
  const status = document.querySelector('#memo-status')
  const clearDone = document.querySelector('#clear-done')
  const store = createMemoStore()

  function render() {
    const memos = store.list()
    list.innerHTML = ''
    empty.hidden = memos.length > 0
    status.textContent = `${memos.length}개 저장됨`

    for (const memo of memos) {
      const item = document.createElement('li')
      item.className = `memo-card${memo.pinned ? ' is-pinned' : ''}${memo.done ? ' is-done' : ''}`
      item.dataset.id = memo.id

      item.innerHTML = `
        <input class="done-toggle" type="checkbox" aria-label="완료 표시" ${memo.done ? 'checked' : ''}>
        <span class="memo-text"></span>
        <div class="memo-actions">
          <button class="icon-button" type="button" data-action="pin" aria-label="${memo.pinned ? '핀 해제' : '핀 고정'}">${memo.pinned ? '★' : '☆'}</button>
          <button class="icon-button" type="button" data-action="delete" aria-label="메모 삭제">×</button>
        </div>
      `
      item.querySelector('.memo-text').textContent = memo.text
      list.append(item)
    }
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault()
    const memo = store.add(input.value)
    if (!memo) return
    input.value = ''
    input.focus()
    render()
  })

  list.addEventListener('click', (event) => {
    const item = event.target.closest('.memo-card')
    if (!item) return

    if (event.target.matches('.done-toggle')) {
      store.toggleDone(item.dataset.id)
      render()
      return
    }

    const action = event.target.dataset.action
    if (action === 'pin') store.togglePinned(item.dataset.id)
    if (action === 'delete') store.remove(item.dataset.id)
    render()
  })

  clearDone.addEventListener('click', () => {
    store.clearDone()
    render()
  })

  render()
}

if (typeof document !== 'undefined') {
  mount()
}
