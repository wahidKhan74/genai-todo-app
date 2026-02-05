import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function NavBar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="bg-white/60 dark:bg-slate-800/60 backdrop-blur sticky top-0 z-20 shadow-sm">
      <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-lg font-semibold">TodoApp</Link>

        <nav className="hidden md:flex items-center space-x-3">
          <Link to="/" className="text-sm px-3 py-1 rounded hover:bg-slate-100 dark:hover:bg-slate-700">Home</Link>
          <Link to="/todos" className="text-sm px-3 py-1 rounded hover:bg-slate-100 dark:hover:bg-slate-700">Todos</Link>
          <Link to="/login" className="text-sm px-3 py-1 rounded hover:bg-slate-100 dark:hover:bg-slate-700">Login</Link>
          <Link to="/register" className="text-sm px-3 py-1 rounded bg-indigo-600 text-white hover:bg-indigo-500">Register</Link>
        </nav>

        <div className="md:hidden">
          <button
            onClick={() => setOpen((s) => !s)}
            aria-label="Toggle menu"
            className="p-2 rounded hover:bg-slate-100 dark:hover:bg-slate-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={open ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden bg-white/80 dark:bg-slate-800/80 border-t">
          <div className="max-w-4xl mx-auto px-4 py-3 flex flex-col gap-2">
            <Link to="/" onClick={() => setOpen(false)} className="px-3 py-2 rounded">Home</Link>
            <Link to="/todos" onClick={() => setOpen(false)} className="px-3 py-2 rounded">Todos</Link>
            <Link to="/login" onClick={() => setOpen(false)} className="px-3 py-2 rounded">Login</Link>
            <Link to="/register" onClick={() => setOpen(false)} className="px-3 py-2 rounded bg-indigo-600 text-white">Register</Link>
          </div>
        </div>
      )}
    </header>
  )
}
