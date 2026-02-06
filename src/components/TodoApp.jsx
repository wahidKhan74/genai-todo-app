import { useState, useEffect } from 'react'
import { getTodos, createTodo, updateTodo, deleteTodo } from '../api/todos'

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
  const [todos, setTodos] = useState([])
  const [text, setText] = useState('')

  useEffect(() => {
    let mounted = true
    getTodos()
      .then((data) => mounted && setTodos(data))
      .catch(() => {})
    return () => {
      mounted = false
    }
  }, [])

  async function addTodo(e) {
    e.preventDefault()
    const value = text.trim()
    if (!value) return
    try {
      const res = await createTodo({ text: value, done: false })
      setTodos((s) => [...s, res])
      setText('')
    } catch (err) {
      // swallow for now; optionally show UI error
    }
  }

  async function toggle(id) {
    const t = todos.find((x) => x.id === id)
    if (!t) return
    try {
      const res = await updateTodo(id, { done: !t.done })
      setTodos((s) => s.map((it) => (it.id === id ? res : it)))
    } catch {}
  }

  async function remove(id) {
    try {
      await deleteTodo(id)
      setTodos((s) => s.filter((t) => t.id !== id))
    } catch {}
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
