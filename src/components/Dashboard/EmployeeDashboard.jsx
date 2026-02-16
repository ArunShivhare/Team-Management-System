import React from "react"
import Header from "../Header/Header"
import TaskListNumbers from "../TaskList/TaskListNumbers"
import TaskList from "../TaskList/TaskList"

const EmployeeDashboard = ({ changeUser, data }) => {
  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <Header changeUser={changeUser} data={data} />

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 space-y-10">

        {/* Task Summary */}
        <section>
          <TaskListNumbers data={{
            ...data,
            taskCounts: {
              newTask: data?.tasks?.filter(t => t.status === 'new').length || 0,
              active: data?.tasks?.filter(t => t.status === 'accepted').length || 0,
              completed: data?.tasks?.filter(t => t.status === 'completed').length || 0,
              failed: data?.tasks?.filter(t => t.status === 'failed').length || 0,
            }
          }} />
        </section>

        {/* Task List */}
        <section>
          <h2 className="text-xl font-semibold mb-4">
            Your Tasks
          </h2>
          <TaskList data={data} />
        </section>

      </main>
    </div>
  )
}

export default EmployeeDashboard
