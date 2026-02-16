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

 if (!users.length)
  return (
    <div className="mt-6 text-center text-sm text-gray-500 bg-white border rounded-xl p-6 shadow-sm">
      No employees yet 👀
    </div>
  )

return (
  <div className="bg-white rounded-2xl border shadow-sm hover:shadow-md transition p-6">
    
    {/* Header */}
    <div className="mb-5 text-center">
      <h3 className="text-lg font-semibold bg-linear-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
        Team Members 👥
      </h3>
      <p className="text-xs text-gray-500 mt-1">
        Manage your team members
      </p>
    </div>

    {/* List */}
    <ul className="space-y-3">
      {users.map(u => (
        <li
          key={u._id || u.id || u.email}
          className="flex items-center justify-between bg-gray-50 hover:bg-gray-100 px-4 py-3 rounded-xl transition"
        >
          {/* User Info */}
          <div>
            <p className="text-sm font-medium">{u.name}</p>
            <p className="text-xs text-gray-500">{u.email}</p>
          </div>

          {/* Delete Button */}
          <button
            onClick={() => del(u._id || u.id)}
            className="text-sm px-4 py-1.5 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 transition"
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  </div>
)

}

export default UserList
