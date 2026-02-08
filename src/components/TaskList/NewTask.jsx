import React from "react"

const NewTask = ({ data }) => {
  if (!data) return null

  return (
    <div className="shrink-0 w-75 bg-white border rounded-2xl p-5 shadow-sm hover:shadow-md transition snap-start">

      {/* Top row */}
      <div className="flex justify-between items-center">
        <span className="text-xs font-medium px-3 py-1 rounded-full border">
          {data.category}
        </span>
        <span className="text-xs text-gray-400">
          {data.taskDate}
        </span>
      </div>

      {/* Title */}
      <h2 className="mt-4 text-lg font-semibold text-gray-900">
        {data.taskTitle}
      </h2>

      {/* Description */}
      <p className="text-sm text-gray-600 mt-2 line-clamp-3">
        {data.taskDescription}
      </p>

      {/* Action */}
      <div className="mt-6">
        <button className="w-full border border-black text-black rounded-lg py-2 text-sm font-medium hover:bg-black hover:text-white transition">
          Accept Task
        </button>
      </div>

    </div>
  )
}

export default NewTask
