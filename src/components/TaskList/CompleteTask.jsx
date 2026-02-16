import React from "react"

const CompleteTask = ({ data }) => {
  if (!data) return null

  return (
    <div className="shrink-0 w-75 bg-white border rounded-2xl p-5 shadow-sm hover:shadow-md transition snap-start">
      <div className="flex justify-between items-center">
        <span className="text-xs font-medium px-3 py-1 rounded-full border border-green-500 text-green-600">{data.category}</span>
        <span className="text-xs text-gray-400">{data.taskDate || new Date(data.createdAt).toLocaleDateString()}</span>
      </div>

      <h2 className="mt-4 text-lg font-semibold text-gray-900">{data.title}</h2>

      <p className="text-sm text-gray-600 mt-2 line-clamp-3">{data.description}</p>

      {data.assignedTo && (
        <p className="text-xs text-gray-500 mt-2">Assigned to: {data.assignedTo.name || data.assignedTo.email}</p>
      )}

      <div className="mt-6">
        <button disabled className="w-full border border-green-500 text-green-600 rounded-lg py-2 text-sm font-medium cursor-not-allowed">Completed</button>
      </div>
    </div>
  )
}

export default CompleteTask
