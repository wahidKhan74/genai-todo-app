import { useState, useEffect } from 'react'

/**
 * TodoApp
 *
 * A simple todo list component that supports adding, toggling and removing
 * todos. Todos are persisted to `localStorage` under the `todos` key so data
 * survives page reloads.
 *
 * Behavior summary:
 * - Add: enter text and submit the form
 * - Toggle: check/uncheck an item to mark it done
 * - Delete: remove an item from the list
 *
 * Accessibility:
 * - The input uses `aria-label` for screen readers.
 *
 * Note: No external props — internal state only.
 */
export default function TodoApp() {
  // Lazy initializer: read persisted todos from localStorage on first render.
  // Wrapping in `try/catch` avoids crashing the app if stored data is malformed
  // or if access to localStorage is restricted (e.g. privacy settings).
  // Using a function here prevents reading localStorage during server-side
  // rendering and avoids unnecessary reads on every render.
  const [todos, setTodos] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('todos')) || []
    } catch {
      return []
    }
  })
  const [text, setText] = useState('')

  // Persist updates to localStorage whenever `todos` changes. We stringify the
  // array because localStorage stores strings only. For larger apps you may
  // want to debounce writes or move persistence to a separate service.
  useEffect(() => {
    try {
      localStorage.setItem('todos', JSON.stringify(todos))
    } catch (e) {
      // Ignore write errors (quota exceeded, private mode, etc.) to avoid
      // crashing the UI; consider surfacing an error to the user if needed.
      // console.warn('Failed to persist todos', e)
    }
  }, [todos])

  function addTodo(e) {
    e.preventDefault()
    const value = text.trim()
    if (!value) return
    // Use functional update to avoid stale closures and ensure we append
    // to the latest state snapshot when multiple updates happen quickly.
    setTodos((s) => [...s, { id: Date.now(), text: value, done: false }])
    setText('')
  }

  function toggle(id) {
    // Map produces a new array instance which keeps updates immutable — this
    // plays nicely with React's change detection and the persistence effect.
    setTodos((s) => s.map((t) => (t.id === id ? { ...t, done: !t.done } : t)))
  }

  function remove(id) {
    // Filter returns a new array without the removed item; functional update
    // prevents races against concurrent setState calls.
    setTodos((s) => s.filter((t) => t.id !== id))
  }

  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
      <h2 className="text-2xl font-semibold mb-4">Todo List</h2>

      <form onSubmit={addTodo} className="flex gap-2 mb-4">
        <input
          className="flex-1 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:bg-slate-700 dark:border-slate-600"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a new todo"
          aria-label="Add todo"
        />
        <button className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-500">Add</button>
      </form>

      <ul className="space-y-2">
        {todos.length === 0 && <li className="text-sm text-slate-500">No todos yet.</li>}
        {todos.map((t) => (
          <li key={t.id} className="flex items-center justify-between gap-4 p-2 rounded border border-slate-100 dark:border-slate-700">
            <label className="flex items-center gap-3">
              <input type="checkbox" className="w-4 h-4" checked={t.done} onChange={() => toggle(t.id)} />
              <span className={`${t.done ? 'line-through text-slate-400' : 'text-slate-800 dark:text-slate-100'}`}>{t.text}</span>
            </label>
            <div className="flex items-center gap-2">
              <button onClick={() => remove(t.id)} className="text-sm text-red-600 hover:underline">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
