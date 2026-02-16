import React, { useContext } from "react"
import { AuthContext } from "../../context/AuthProvider"

const AcceptTask = ({ data }) => {
  const { updateTask } = useContext(AuthContext)
  if (!data) return null

  const markCompleted = async () => {
    try {
      await updateTask(data._id, { status: 'completed' })
    } catch (err) { console.error(err); alert('Could not mark completed') }
  }

  const markFailed = async () => {
    try {
      await updateTask(data._id, { status: 'failed' })
    } catch (err) { console.error(err); alert('Could not mark failed') }
  }

  return (
    <div className="shrink-0 w-75 bg-white border rounded-2xl p-5 shadow-sm hover:shadow-md transition snap-start">
      <div className="flex justify-between items-center">
        <span className="text-xs font-medium px-3 py-1 rounded-full border border-yellow-500 text-yellow-600">{data.category}</span>
        <span className="text-xs text-gray-400">{data.taskDate || new Date(data.createdAt).toLocaleDateString()}</span>
      </div>

      <h2 className="mt-4 text-lg font-semibold text-gray-900">{data.title}</h2>

      <p className="text-sm text-gray-600 mt-2 line-clamp-3">{data.description}</p>

      {data.assignedTo && (
        <p className="text-xs text-gray-500 mt-2">Assigned to: {data.assignedTo.name || data.assignedTo.email}</p>
      )}

      <div className="flex gap-2 mt-6">
        <button onClick={markCompleted} className="flex-1 border border-green-600 text-green-600 rounded-lg py-2 text-xs font-medium hover:bg-green-600 hover:text-white transition">Mark as Completed</button>

        <button onClick={markFailed} className="flex-1 border border-red-600 text-red-600 rounded-lg py-2 text-xs font-medium hover:bg-red-600 hover:text-white transition">Mark as Failed</button>
      </div>
    </div>
  )
}

export default AcceptTask
