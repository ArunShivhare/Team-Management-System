import React, { useEffect, useState, useContext } from 'react'
import { AuthContext } from '../../context/AuthProvider'

const UserList = ({ refresh }) => {
  const { fetchUsers, loadEmployees, token } = useContext(AuthContext)
  const [users, setUsers] = useState([])

  useEffect(() => {
    let mounted = true
    ;(async () => {
      const data = await fetchUsers()
      if (mounted) setUsers(data || [])
    })()
    return () => { mounted = false }
  }, [fetchUsers, refresh])

  const del = async (id) => {
    if (!confirm('Delete this employee?')) return
    try {
      const res = await fetch(`/api/users/${id}`, { method: 'DELETE', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` } })
      if (!res.ok) throw new Error('Delete failed')
      setUsers(u => u.filter(x => (x._id || x.id) !== id))
      // refresh aggregated counts
      if (loadEmployees) loadEmployees()
    } catch (err) { alert(err.message || 'Delete failed') }
  }

  if (!users.length) return <div className="mt-4 text-sm text-gray-500">No employees yet</div>

  return (
    <div className="bg-white border rounded p-4">
      <h3 className="font-semibold mb-2">Team Members</h3>
      <ul className="space-y-2">
        {users.map(u => (
          <li key={u._id || u.id || u.email} className="flex items-center justify-between">
            <div className="text-sm">
              <div className="font-medium">{u.name}</div>
              <div className="text-xs text-gray-500">{u.email}</div>
            </div>
            <div>
              <button onClick={() => del(u._id || u.id)} className="px-3 py-1 text-sm border rounded text-red-600">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default UserList
