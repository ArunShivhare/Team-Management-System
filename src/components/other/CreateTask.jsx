import React, { useContext, useState } from "react"
import { AuthContext } from "../../context/AuthProvider"
import { setEmployees } from "../../utils/localStorage"

const CreateTask = () => {
  const { employees, setEmployees: setEmployeesState } =
    useContext(AuthContext)

  const [taskTitle, setTaskTitle] = useState("")
  const [taskDescription, setTaskDescription] = useState("")
  const [taskDate, setTaskDate] = useState("")
  const [assignTo, setAssignTo] = useState("")
  const [category, setCategory] = useState("")

  const submitHandler = (e) => {
    e.preventDefault()

    if (!taskTitle || !taskDate || !assignTo || !category) {
      alert("Please fill all required fields")
      return
    }

    const newTask = {
      taskTitle,
      taskDescription,
      taskDate,
      category,
      active: false,
      newTask: true,
      completed: false,
      failed: false,
    }

    const updatedEmployees = employees.map((emp) => {
      if (emp.firstName === assignTo) {
        return {
          ...emp,
          tasks: [...emp.tasks, newTask],
          taskCounts: {
            ...emp.taskCounts,
            newTask: emp.taskCounts.newTask + 1,
          },
        }
      }
      return emp
    })

    setEmployeesState(updatedEmployees)
    setEmployees(updatedEmployees) // persist to localStorage

    // Reset form
    setTaskTitle("")
    setTaskDescription("")
    setTaskDate("")
    setAssignTo("")
    setCategory("")
  }

  return (
    <div className="bg-white border rounded-2xl p-6 mt-10 shadow-sm">
      <h2 className="text-xl font-semibold mb-6">
        Create New Task
      </h2>

      <form
        onSubmit={submitHandler}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* Left */}
        <div className="space-y-4">
          <div>
            <label className="text-sm text-gray-600">
              Task Title
            </label>
            <input
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              className="w-full mt-1 px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black"
              type="text"
              placeholder="Make a UI design"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">
              Due Date
            </label>
            <input
              value={taskDate}
              onChange={(e) => setTaskDate(e.target.value)}
              className="w-full mt-1 px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black"
              type="date"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">
              Assign To (Employee Name)
            </label>
            <input
              value={assignTo}
              onChange={(e) => setAssignTo(e.target.value)}
              className="w-full mt-1 px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black"
              type="text"
              placeholder="Arjun"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">
              Category
            </label>
            <input
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full mt-1 px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black"
              type="text"
              placeholder="Design / Development"
            />
          </div>
        </div>

        {/* Right */}
        <div className="flex flex-col">
          <label className="text-sm text-gray-600">
            Description
          </label>
          <textarea
            value={taskDescription}
            onChange={(e) =>
              setTaskDescription(e.target.value)
            }
            className="mt-1 flex-1 px-3 py-2 border rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="Describe the task..."
          />
          <button
            type="submit"
            className="mt-4 bg-black text-white py-3 rounded-lg text-sm font-medium hover:bg-gray-900 transition"
          >
            Create Task
          </button>
        </div>
      </form>
    </div>
  )
}

export default CreateTask
