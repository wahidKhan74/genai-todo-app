export default function Register() {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
      <h2 className="text-2xl font-semibold mb-4">Register</h2>
      <form className="flex flex-col gap-3 max-w-sm">
        <input type="text" placeholder="Name" className="px-3 py-2 border rounded dark:bg-slate-700" />
        <input type="email" placeholder="Email" className="px-3 py-2 border rounded dark:bg-slate-700" />
        <input type="password" placeholder="Password" className="px-3 py-2 border rounded dark:bg-slate-700" />
        <button className="px-4 py-2 bg-indigo-600 text-white rounded">Create account</button>
      </form>
    </div>
  )
}
