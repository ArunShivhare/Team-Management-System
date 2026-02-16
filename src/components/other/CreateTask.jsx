import React, { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../context/AuthProvider"

const CreateTask = () => {
  const { createTask, fetchUsers, token } = useContext(AuthContext)

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [taskDate, setTaskDate] = useState("")
  const [category, setCategory] = useState("")
  const [assignedTo, setAssignedTo] = useState("")
  const [users, setUsers] = useState([])

  useEffect(() => {
    let mounted = true
    fetchUsers(token).then((res) => {
      if (mounted) setUsers(res || [])
    })
    return () => { mounted = false }
  }, [token])

  const submitHandler = async (e) => {
    e.preventDefault()
    if (!title) return alert("Please add a title")

    try {
      await createTask({
        title,
        description,
        category,
        taskDate,
        assignedTo: assignedTo || undefined
      })

      setTitle("")
      setDescription("")
      setTaskDate("")
      setCategory("")
      setAssignedTo("")
    } catch (err) {
      console.error(err)
      alert("Could not create task")
    }
  }

  return (
    <div className="mt-8 rounded-2xl border bg-white shadow-sm p-6">

      {/* Heading */}
      <h2 className="text-xl font-semibold mb-6">
        Create New Task ✨
      </h2>

      <form
        onSubmit={submitHandler}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* LEFT SIDE */}
        <div className="space-y-5">

          {/* Title */}
          <div>
            <label className="text-sm font-medium text-gray-600">
              Task Title
            </label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              placeholder="Make a UI design"
              className="w-full mt-1 px-4 py-2 rounded-lg border focus:ring-2 focus:ring-purple-500 outline-none"
            />
          </div>

          {/* Date */}
          <div>
            <label className="text-sm font-medium text-gray-600">
              Due Date
            </label>
            <input
              value={taskDate}
              onChange={(e) => setTaskDate(e.target.value)}
              type="date"
              className="w-full mt-1 px-4 py-2 rounded-lg border focus:ring-2 focus:ring-purple-500 outline-none"
            />
          </div>

          {/* Category */}
          <div>
            <label className="text-sm font-medium text-gray-600">
              Category
            </label>
            <input
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              type="text"
              placeholder="Design / Development"
              className="w-full mt-1 px-4 py-2 rounded-lg border focus:ring-2 focus:ring-purple-500 outline-none"
            />
          </div>

          {/* Assign */}
          <div>
            <label className="text-sm font-medium text-gray-600">
              Assign To
            </label>

            <select
              value={assignedTo}
              onChange={(e) => setAssignedTo(e.target.value)}
              className="w-full mt-1 px-4 py-2 rounded-lg border focus:ring-2 focus:ring-purple-500 outline-none"
            >
              <option value="">-- Select employee (optional) --</option>

              {users.length === 0 && (
                <option disabled>No employees found</option>
              )}

              {users.map(u => (
                <option
                  key={u._id || u.id || u.email}
                  value={u._id || u.id || u.email}
                >
                  {u.name} — {u.email}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex flex-col">

          <label className="text-sm font-medium text-gray-600">
            Description
          </label>

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe the task..."
            className="mt-1 flex-1 px-4 py-3 rounded-lg border resize-none focus:ring-2 focus:ring-purple-500 outline-none"
          />

          <button
            type="submit"
            className="mt-5 bg-linear-to-br from-purple-600 to-blue-500 text-white py-3 rounded-xl font-medium hover:opacity-90 transition"
          >
            Create Task
          </button>

        </div>
      </form>
    </div>
  )
}

export default CreateTask
