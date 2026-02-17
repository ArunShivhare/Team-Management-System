import React, { useContext } from "react"
import { AuthContext } from "../../context/AuthProvider"

function resolveAssigned(a, employees = []) {
  if (!a) return 'Unassigned'
  console.log('[CompleteTask] assignedTo:', a, 'is object?', typeof a === 'object', 'has name?', a?.name)
  
  // If already populated from backend with name/email
  if (typeof a === 'object' && a.name) return a.name
  if (typeof a === 'object' && a.email) return a.email
  
  // Try to find in employees list
  if (typeof a === 'object' && a._id) {
    const found = employees.find(e => e.id === String(a._id))
    if (found?.name) return found.name
  }
  
  const s = String(a)
  const found = employees.find(e => e.id === s || e.id?.toString() === s)
  if (found?.name) return found.name
  
  return s
}

const CompleteTask = ({ data, onClick }) => {
  if (!data) return null
  const { employees = [] } = useContext(AuthContext)

  return (
    <div
  onClick={onClick}
  className="cursor-pointer shrink-0 w-75 bg-white border rounded-2xl p-5 shadow-sm hover:shadow-md transition"
>


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
          <span className="font-medium">{resolveAssigned(data.assignedTo, employees)}</span>
        </p>
      )}

      {/* Status Button */}
      <div className="mt-6">
        <button
          onClick={(e) => e.stopPropagation()}
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
