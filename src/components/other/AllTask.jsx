import React, { useContext } from "react"
import { AuthContext } from "../../context/AuthProvider"

const AllTask = () => {
  const { employees } = useContext(AuthContext)

  if (!employees?.length) {
    return (
      <div className="mt-8 text-center text-gray-500">
        No employee data available
      </div>
    )
  }

  return (
    <div className="mt-8 rounded-2xl border bg-white shadow-sm overflow-hidden">

      {/* Header Row */}
      <div className="grid grid-cols-5 gap-4 px-6 py-4 border-b bg-linear-to-r from-purple-50 to-blue-50 text-sm font-semibold text-gray-600">
        <div>Employee</div>
        <div className="text-center">New</div>
        <div className="text-center">Active</div>
        <div className="text-center">Completed</div>
        <div className="text-center">Failed</div>
      </div>

      {/* Data Rows */}
      {employees.map((emp) => (
        <div
          key={emp.id}
          className="grid grid-cols-5 gap-4 px-6 py-4 border-b text-sm hover:bg-gray-50 transition"
        >
          {/* Name */}
          <div className="font-medium text-gray-800">
            {emp.name || emp.firstName}
          </div>

          {/* New */}
          <div className="text-center">
            <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-blue-100 text-blue-600 font-semibold">
              {emp.taskCounts.newTask}
            </span>
          </div>

          {/* Active */}
          <div className="text-center">
            <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-indigo-100 text-indigo-600 font-semibold">
              {emp.taskCounts.active}
            </span>
          </div>

          {/* Completed */}
          <div className="text-center">
            <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-green-100 text-green-600 font-semibold">
              {emp.taskCounts.completed}
            </span>
          </div>

          {/* Failed */}
          <div className="text-center">
            <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-red-100 text-red-600 font-semibold">
              {emp.taskCounts.failed}
            </span>
          </div>
        </div>
      ))}

    </div>
  )
}

export default AllTask
