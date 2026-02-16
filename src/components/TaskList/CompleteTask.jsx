import React from "react"

const CompleteTask = ({ data }) => {
  if (!data) return null

  return (
    <div className="shrink-0 w-80 card p-5 snap-start hover:scale-[1.02] transition-all duration-300">

      {/* Header */}
      <div className="flex justify-between items-center">
        <span className="text-xs font-medium px-3 py-1 rounded-full bg-green-50 text-green-700 border border-green-200">
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

      {/* Status Button */}
      <div className="mt-6">
        <button
          disabled
          className="w-full py-2 rounded-lg text-sm font-medium
          bg-green-50 text-green-700 border border-green-200
          cursor-not-allowed opacity-90"
        >
          ✓ Completed
        </button>
      </div>

    </div>
  )
}

export default CompleteTask
