import { useState, useEffect } from 'react'

export default function TodoApp() {
  const [todos, setTodos] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('todos')) || []
    } catch {
      return []
    }
  })
  const [text, setText] = useState('')

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  function addTodo(e) {
    e.preventDefault()
    const value = text.trim()
    if (!value) return
    setTodos((s) => [...s, { id: Date.now(), text: value, done: false }])
    setText('')
  }

  function toggle(id) {
    setTodos((s) => s.map((t) => (t.id === id ? { ...t, done: !t.done } : t)))
  }

  function remove(id) {
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
