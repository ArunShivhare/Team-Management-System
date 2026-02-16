import React from "react"

const TaskListNumbers = ({ data }) => {
  const taskCounts = data?.taskCounts || {
    newTask: 0,
    active: 0,
    completed: 0,
    failed: 0,
  }

  const cards = [
    {
      label: "New Tasks",
      value: taskCounts.newTask,
      color: "from-blue-500 to-indigo-500",
      bg: "bg-blue-50"
    },
    {
      label: "In Progress",
      value: taskCounts.active,
      color: "from-purple-500 to-indigo-500",
      bg: "bg-purple-50"
    },
    {
      label: "Completed",
      value: taskCounts.completed,
      color: "from-green-500 to-emerald-500",
      bg: "bg-green-50"
    },
    {
      label: "Failed",
      value: taskCounts.failed,
      color: "from-red-500 to-rose-500",
      bg: "bg-red-50"
    },
  ]

  return (
    <section className="mt-10 px-4">

      {/* Section title */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold tracking-tight">
          Task Overview
        </h2>
        <p className="text-sm muted">
          Summary of your task performance
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

        {cards.map((card, i) => (
          <div
            key={i}
            className="
            relative overflow-hidden
            bg-white border rounded-2xl p-6
            shadow-sm hover:shadow-md
            transition duration-300
            hover:-translate-y-1
            "
          >
            {/* Glow Accent */}
            <div className={`absolute top-0 left-0 w-full h-1 bg-linear-to-r ${card.color}`} />

            {/* Content */}
            <h2 className="text-4xl font-bold tracking-tight">
              {card.value}
            </h2>

            <p className="text-sm muted mt-2">
              {card.label}
            </p>

            {/* Soft background circle */}
            <div className={`absolute -right-6 -bottom-6 w-24 h-24 rounded-full opacity-40 ${card.bg}`} />
          </div>
        ))}

      </div>
    </section>
  )
}

export default TaskListNumbers
