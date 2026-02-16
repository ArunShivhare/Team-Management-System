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
    <div className="shrink-0 w-80 card p-5 snap-start hover:scale-[1.02] transition-all duration-300">

      {/* Header */}
      <div className="flex justify-between items-center">
        <span className="text-xs font-medium px-3 py-1 rounded-full bg-yellow-50 text-yellow-700 border border-yellow-200">
          {data.category}
        </span>

        <span className="text-xs muted">
          {data.taskDate || new Date(data.createdAt).toLocaleDateString()}
        </span>
      </div>

      {/* Title */}
      <h2 className="mt-4 text-lg font-semibold tracking-tight">
        {data.title}
      </h2>

      {/* Description */}
      <p className="text-sm muted mt-2 line-clamp-3">
        {data.description}
      </p>

      {/* Assigned */}
      {data.assignedTo && (
        <p className="text-xs muted mt-2">
          Assigned to: <span className="font-medium">{data.assignedTo.name || data.assignedTo.email}</span>
        </p>
      )}

      {/* Actions */}
      <div className="flex gap-3 mt-6">

        <button
          onClick={markCompleted}
          className="flex-1 py-2 rounded-lg text-xs font-medium 
          border border-green-600 text-green-600
          hover:bg-green-600 hover:text-white
          active:scale-95 transition-all duration-200"
        >
          Completed
        </button>

        <button
          onClick={markFailed}
          className="flex-1 py-2 rounded-lg text-xs font-medium
          border border-red-600 text-red-600
          hover:bg-red-600 hover:text-white
          active:scale-95 transition-all duration-200"
        >
          Failed
        </button>

      </div>

    </div>
  )
}

export default AcceptTask
