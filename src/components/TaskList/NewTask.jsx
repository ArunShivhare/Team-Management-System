import React, { useContext } from "react"
import { AuthContext } from "../../context/AuthProvider"

const NewTask = ({ data }) => {
  const { updateTask } = useContext(AuthContext)
  if (!data) return null

  const accept = async () => {
    try {
      await updateTask(data._id, { status: 'accepted' })
    } catch (err) {
      console.error(err)
      alert('Could not accept task')
    }
  }

  return (
    <div className="shrink-0 w-80 card p-5 snap-start hover:scale-[1.02] transition-all duration-300">

      {/* Header */}
      <div className="flex justify-between items-center">
        <span className="text-xs font-medium px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
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
          Assigned to:{" "}
          <span className="font-medium">
            {data.assignedTo.name || data.assignedTo.email}
          </span>
        </p>
      )}

      {/* Action */}
      <div className="mt-6">
        <button
          onClick={accept}
          className="w-full py-2 rounded-lg text-sm font-medium
          bg-linear-to-r from-purple-600 to-blue-500 text-white
          hover:opacity-90 transition"
        >
          Accept Task
        </button>
      </div>

    </div>
  )
}

export default NewTask
