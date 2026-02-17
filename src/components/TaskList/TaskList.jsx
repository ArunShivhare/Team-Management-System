import React, { useState, useEffect, useContext } from "react"
import AcceptTask from "./AcceptTask"
import NewTask from "./NewTask"
import CompleteTask from "./CompleteTask"
import FailedTask from "./FailedTask"
import TaskModal from "./TaskModal"
import { AuthContext } from "../../context/AuthProvider"

const TaskList = ({ data }) => {
  const tasks = data?.tasks || []
  const [selectedTask, setSelectedTask] = useState(null)
  const { employees = [], loadEmployees } = useContext(AuthContext)

  useEffect(() => {
    // if there are tasks with assignedTo as id-strings and employees list doesn't contain them, reload employees
    if (!tasks.length || !loadEmployees) return
    const needsLoad = tasks.some(t => {
      const a = t.assignedTo
      if (!a) return false
      if (typeof a === 'object') return false
      // if employees doesn't have a matching id or email, we need to load
      return !employees.find(e => e.id === String(a) || e.email === String(a))
    })
    if (needsLoad) loadEmployees()
  }, [tasks, employees, loadEmployees])

  if (!tasks.length) {
    return (
      <div className="mt-16 text-center text-gray-400">
        No tasks assigned yet
      </div>
    )
  }

  return (
    <>
      <div
        id="tasklist"
        className="snap-start mt-16 w-full overflow-x-auto flex gap-5 py-2 px-1 snap-x snap-mandatory"
      >
        {tasks.map((task) => {
          const props = {
            key: task._id,
            data: task,
            onClick: () => setSelectedTask(task)
          }

          if (task.status === 'new') return <NewTask {...props} />
          if (task.status === 'accepted') return <AcceptTask {...props} />
          if (task.status === 'completed') return <CompleteTask {...props} />
          if (task.status === 'failed') return <FailedTask {...props} />
          return null
        })}
      </div>

      {/* Modal */}
      <TaskModal task={selectedTask} onClose={() => setSelectedTask(null)} />
    </>
  )
}

export default TaskList
