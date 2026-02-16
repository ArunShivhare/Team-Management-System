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
    <form onSubmit={submit} className="bg-white p-4 rounded-lg border">
      <h3 className="text-sm font-semibold mb-3">Add Employee</h3>
      <input value={name} onChange={e=>setName(e.target.value)} placeholder="Full name" className="w-full mb-2 px-3 py-2 border rounded" />
      <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="email" className="w-full mb-2 px-3 py-2 border rounded" />
      <input value={password} onChange={e=>setPassword(e.target.value)} placeholder="password" type="password" className="w-full mb-2 px-3 py-2 border rounded" />
      <button disabled={loading} className="px-4 py-2 bg-black text-white rounded">{loading ? 'Adding...' : 'Add Employee'}</button>
    </form>
  )
}

export default AddEmployee
