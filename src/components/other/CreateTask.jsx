import React, { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../context/AuthProvider"

const CreateTask = () => {
  const { createTask, fetchUsers } = useContext(AuthContext)

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [taskDate, setTaskDate] = useState("")
  const [category, setCategory] = useState("")
  const [assignedTo, setAssignedTo] = useState("")
  const [users, setUsers] = useState([])

  useEffect(() => {
    let mounted = true
    fetchUsers().then((res) => {
      if (mounted) setUsers(res || [])
    })
    return () => { mounted = false }
  }, [])

  const submitHandler = async (e) => {
    e.preventDefault()
    if (!title) return alert('Please add a title')
    try {
      await createTask({ title, description, category, taskDate, assignedTo: assignedTo || undefined })
      setTitle("")
      setDescription("")
      setTaskDate("")
      setCategory("")
      setAssignedTo("")
    } catch (err) {
      console.error(err)
      alert('Could not create task')
    }
  }

  return (
    <div className="bg-white border rounded-2xl p-6 mt-10 shadow-sm">
      <h2 className="text-xl font-semibold mb-6">Create New Task</h2>

      <form onSubmit={submitHandler} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="text-sm text-gray-600">Task Title</label>
            <input value={title} onChange={(e) => setTitle(e.target.value)} className="w-full mt-1 px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black" type="text" placeholder="Make a UI design" />
          </div>

          <div>
            <label className="text-sm text-gray-600">Due Date</label>
            <input value={taskDate} onChange={(e) => setTaskDate(e.target.value)} className="w-full mt-1 px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black" type="date" />
          </div>

          <div>
            <label className="text-sm text-gray-600">Category</label>
            <input value={category} onChange={(e) => setCategory(e.target.value)} className="w-full mt-1 px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black" type="text" placeholder="Design / Development" />
          </div>

          <div>
            <label className="text-sm text-gray-600">Assign To</label>
            <select value={assignedTo} onChange={(e) => setAssignedTo(e.target.value)} className="w-full mt-1 px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black">
              <option value="">-- Select employee (optional) --</option>
              {users.map(u => <option key={u._id || u.id || u.email} value={u._id || u.id || u.email}>{u.name} — {u.email}</option>)}
            </select>
          </div>
        </div>

        <div className="flex flex-col">
          <label className="text-sm text-gray-600">Description</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="mt-1 flex-1 px-3 py-2 border rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-black" placeholder="Describe the task..." />
          <button type="submit" className="mt-4 bg-black text-white py-3 rounded-lg text-sm font-medium hover:bg-gray-900 transition">Create Task</button>
        </div>
      </form>
    </div>
  )
}

export default CreateTask
