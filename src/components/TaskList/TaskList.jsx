import React from "react"
import AcceptTask from "./AcceptTask"
import NewTask from "./NewTask"
import CompleteTask from "./CompleteTask"
import FailedTask from "./FailedTask"

const TaskList = ({ data }) => {
  const tasks = data?.tasks || []

  if (!tasks.length) {
    return (
      <div className="mt-16 text-center">
        <div className="inline-block card px-6 py-8">
          <p className="text-lg font-semibold">No Tasks Yet 📭</p>
          <p className="text-sm muted mt-1">
            Tasks assigned to you will appear here
          </p>
        </div>
      </div>
    )
  }

  return (
    <section className="mt-16">

      {/* Section Heading */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold tracking-tight">
          Your Tasks
        </h2>

        <span className="text-sm muted">
          {tasks.length} total
        </span>
      </div>

      {/* Scroll Container */}
      <div
        id="tasklist"
        className="
        flex gap-6 overflow-x-auto pb-3 px-1
        snap-x snap-mandatory scroll-smooth
        "
      >
        {tasks.map((task) => {
          if (task.status === "new")
            return <NewTask key={task._id} data={task} />

          if (task.status === "accepted")
            return <AcceptTask key={task._id} data={task} />

          if (task.status === "completed")
            return <CompleteTask key={task._id} data={task} />

          if (task.status === "failed")
            return <FailedTask key={task._id} data={task} />

          return null
        })}
      </div>

    </section>
  )
}

export default TaskList
