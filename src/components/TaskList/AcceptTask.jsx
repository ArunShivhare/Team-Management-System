import React, { useContext } from "react"
import { AuthContext } from "../../context/AuthProvider"

function resolveAssigned(a, employees = []) {
  if (!a) return 'Unassigned'
  console.log('[AcceptTask] assignedTo:', a, 'is object?', typeof a === 'object', 'has name?', a?.name)
  
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

const AcceptTask = ({ data, onClick }) => {
  const { updateTask, employees = [] } = useContext(AuthContext)
  if (!data) return null

  const markCompleted = async (e) => {
    if (e && e.stopPropagation) e.stopPropagation()
    try {
      await updateTask(data._id, { status: 'completed' })
    } catch (err) { console.error(err); alert('Could not mark completed') }
  }

  const markFailed = async (e) => {
    if (e && e.stopPropagation) e.stopPropagation()
    try {
      await updateTask(data._id, { status: 'failed' })
    } catch (err) { console.error(err); alert('Could not mark failed') }
  }

  return (
    <div
  onClick={onClick}
  className="cursor-pointer shrink-0 w-75 bg-white border rounded-2xl p-5 shadow-sm hover:shadow-md transition"
>

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
          Assigned to: <span className="font-medium">{resolveAssigned(data.assignedTo, employees)}</span>
        </p>
      )}

      {/* Actions */}
      <div className="flex gap-3 mt-6">

        <button
          onClick={(e) => markCompleted(e)}
          className="flex-1 py-2 rounded-lg text-xs font-medium 
          border border-green-600 text-green-600
          hover:bg-green-600 hover:text-white
          active:scale-95 transition-all duration-200"
        >
          Completed
        </button>

        <button
          onClick={(e) => markFailed(e)}
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
