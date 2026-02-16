import React, { useContext } from "react"
import { AuthContext } from "../../context/AuthProvider"

const AllTask = () => {
  const { employees } = useContext(AuthContext)

  if (!employees?.length) {
    return (
      <div className="mt-10 text-center text-gray-400">
        No employee data available
      </div>
    )
  }

  return (
    <div className="bg-white border rounded-2xl mt-10 shadow-sm overflow-hidden">

      {/* Header Row */}
      <div className="grid grid-cols-5 gap-4 px-6 py-4 border-b bg-gray-50 text-sm font-semibold text-gray-600">
        <div>Employee</div>
        <div>New</div>
        <div>Active</div>
        <div>Completed</div>
        <div>Failed</div>
      </div>

      {/* Data Rows */}
      {employees.map((emp) => (
        <div
          key={emp.id}
          className="grid grid-cols-5 gap-4 px-6 py-4 border-b text-sm hover:bg-gray-50 transition"
        >
          <div className="font-medium text-gray-900">
            {emp.name || emp.firstName}
          </div>

          <div className="text-gray-600">
            {emp.taskCounts.newTask}
          </div>

          <div className="text-gray-600">
            {emp.taskCounts.active}
          </div>

          <div className="text-gray-600">
            {emp.taskCounts.completed}
          </div>

          <div className="text-gray-600">
            {emp.taskCounts.failed}
          </div>
        </div>
      ))}

    </div>
  )
}

export default AllTask
