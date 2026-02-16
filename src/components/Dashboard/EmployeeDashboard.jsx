import React from "react"
import Header from "../Header/Header"
import TaskListNumbers from "../TaskList/TaskListNumbers"
import TaskList from "../TaskList/TaskList"
import Footer from "../Footer/Footer"

const EmployeeDashboard = ({ changeUser, data }) => {
  return (
  <div className="min-h-screen bg-linear-to-br from-purple-50 via-white to-blue-50">

    {/* Header */}
    <Header changeUser={changeUser} data={data} className="sticky top-0 z-50 backdrop-blur bg-white/70 border-b border-gray-200" />

    {/* Content */}
    <main className="max-w-7xl mx-auto px-4 py-10 space-y-10">

      {/* Title */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl md:text-4xl font-bold bg-linear-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
          Employee Dashboard 👨‍💻
        </h1>
        <p className="text-gray-500">
          Track your tasks, progress and performance
        </p>
      </div>

      {/* Task Summary */}
      <section className="bg-white rounded-2xl shadow-sm border p-6 hover:shadow-md transition">
        <TaskListNumbers
          data={{
            ...data,
            taskCounts: {
              newTask: data?.tasks?.filter(t => t.status === 'new').length || 0,
              active: data?.tasks?.filter(t => t.status === 'accepted').length || 0,
              completed: data?.tasks?.filter(t => t.status === 'completed').length || 0,
              failed: data?.tasks?.filter(t => t.status === 'failed').length || 0,
            }
          }}
        />
      </section>

      {/* Task List */}
      <section className="bg-white rounded-2xl shadow-sm border p-6 hover:shadow-md transition">
        <h2 className="text-xl font-semibold mb-4">
          Your Tasks
        </h2>
        <TaskList data={data} />
      </section>

    </main>

    <Footer />
  </div>
)

}

export default EmployeeDashboard
