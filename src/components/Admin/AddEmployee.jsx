import React, { useState, useContext } from 'react'
import { AuthContext } from '../../context/AuthProvider'

const AddEmployee = ({ onAdded }) => {
  const { token } = useContext(AuthContext)
  const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    if (!name || !email || !password) return alert('Provide all fields')
    setLoading(true)
    try {
      const res = await fetch(`${API}/users`, { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }, body: JSON.stringify({ name, email, password }) })
      if (!res.ok) throw new Error('Create failed')
      await res.json()
      setName(''); setEmail(''); setPassword('')
      if (onAdded) onAdded()
    } catch (err) {
      alert(err.message || 'Could not create')
    } finally { setLoading(false) }
  }

  return (
  <form
    onSubmit={submit}
    className="bg-white rounded-2xl border shadow-sm hover:shadow-md transition p-6 space-y-4"
  >
    {/* Title */}
    <div className="text-center">
      <h3 className="text-lg font-semibold bg-linear-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
        Add Employee 👤
      </h3>
      <p className="text-xs text-gray-500 mt-1">
        Create a new employee account
      </p>
    </div>

    {/* Name */}
    <div>
      <label className="text-xs text-gray-500">Full Name</label>
      <input
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="John Doe"
        className="w-full mt-1 px-4 py-2 rounded-lg border focus:ring-2 focus:ring-purple-500 outline-none transition"
      />
    </div>

    {/* Email */}
    <div>
      <label className="text-xs text-gray-500">Email</label>
      <input
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="john@example.com"
        className="w-full mt-1 px-4 py-2 rounded-lg border focus:ring-2 focus:ring-purple-500 outline-none transition"
      />
    </div>

    {/* Password */}
    <div>
      <label className="text-xs text-gray-500">Password</label>
      <input
        value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder="••••••••"
        type="password"
        className="w-full mt-1 px-4 py-2 rounded-lg border focus:ring-2 focus:ring-purple-500 outline-none transition"
      />
    </div>

    {/* Button */}
    <button
      disabled={loading}
      className="w-full py-2.5 rounded-xl font-medium text-white bg-linear-to-r from-purple-600 to-blue-500 hover:opacity-90 transition disabled:opacity-50"
    >
      {loading ? "Adding Employee..." : "Add Employee"}
    </button>
  </form>
)

}

export default AddEmployee
