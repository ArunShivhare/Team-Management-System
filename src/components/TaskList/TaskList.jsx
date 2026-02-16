import React from "react"
import AcceptTask from "./AcceptTask"
import NewTask from "./NewTask"
import CompleteTask from "./CompleteTask"
import FailedTask from "./FailedTask"

const TaskList = ({ data }) => {
  const tasks = data?.tasks || []

  if (!tasks.length) {
    return (
      <div className="mt-16 text-center text-gray-400">
        No tasks assigned yet
      </div>
    )
  }

  return (
    <div
      id="tasklist"
      className="snap-start mt-16 w-full overflow-x-auto flex gap-5 py-2 px-1 snap-x snap-mandatory"
    >
      {tasks.map((task) => {
        if (task.status === 'new') return <NewTask key={task._id} data={task} />
        if (task.status === 'accepted') return <AcceptTask key={task._id} data={task} />
        if (task.status === 'completed') return <CompleteTask key={task._id} data={task} />
        if (task.status === 'failed') return <FailedTask key={task._id} data={task} />
        return null
      })}
    </div>
  )
}

export default TaskList
