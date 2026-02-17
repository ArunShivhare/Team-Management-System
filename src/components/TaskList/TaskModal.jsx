import React, { useEffect } from "react"

const TaskModal = ({ task, onClose }) => {
  if (!task) return null

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [onClose])

  return (
    <div onClick={onClose} className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">

      {/* Modal Box */}
      <div onClick={(e) => e.stopPropagation()} className="bg-white rounded-2xl shadow-xl w-[90%] max-w-lg p-6 relative animate-fadeIn">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-black text-xl"
        >
          ✕
        </button>

        {/* Header */}
        <h2 className="text-xl font-bold mb-2">{task.title}</h2>

        <p className="text-xs text-gray-400 mb-4">
          {task.taskDate || new Date(task.createdAt).toLocaleDateString()}
        </p>

        {/* Category */}
        <span className="text-xs border px-3 py-1 rounded-full">
          {task.category}
        </span>

        {/* Description */}
        <div className="task-desc mt-5 text-gray-700 leading-relaxed whitespace-pre-wrap break-all max-h-56 overflow-auto pr-2">
          {task.description || "No description provided"}
        </div>
        <style>{`
          .task-desc { -ms-overflow-style: none; scrollbar-width: none; }
          .task-desc::-webkit-scrollbar { display: none; }
        `}</style>

      </div>
    </div>
  )
}

export default TaskModal
