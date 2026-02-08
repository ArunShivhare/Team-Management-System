import React from "react"

const TaskListNumbers = ({ data }) => {
  const taskCounts = data?.taskCounts || {
    newTask: 0,
    active: 0,
    completed: 0,
    failed: 0,
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10 px-4">

      {/* New Tasks */}
      <div className="bg-white border rounded-2xl p-6 shadow-sm hover:shadow-md transition">
        <h2 className="text-4xl font-extrabold text-gray-900">
          {taskCounts.newTask}
        </h2>
        <p className="text-sm text-gray-500 mt-2">
          New Tasks
        </p>
      </div>

      {/* In Progress */}
      <div className="bg-white border rounded-2xl p-6 shadow-sm hover:shadow-md transition">
        <h2 className="text-4xl font-extrabold text-gray-900">
          {taskCounts.active}
        </h2>
        <p className="text-sm text-gray-500 mt-2">
          In Progress
        </p>
      </div>

      {/* Completed */}
      <div className="bg-white border rounded-2xl p-6 shadow-sm hover:shadow-md transition">
        <h2 className="text-4xl font-extrabold text-gray-900">
          {taskCounts.completed}
        </h2>
        <p className="text-sm text-gray-500 mt-2">
          Completed
        </p>
      </div>

      {/* Failed */}
      <div className="bg-white border rounded-2xl p-6 shadow-sm hover:shadow-md transition">
        <h2 className="text-4xl font-extrabold text-gray-900">
          {taskCounts.failed}
        </h2>
        <p className="text-sm text-gray-500 mt-2">
          Failed
        </p>
      </div>

    </div>
  )
}

export default TaskListNumbers
