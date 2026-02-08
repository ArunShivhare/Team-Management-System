import React from "react"
import Header from "../Header/Header"
import CreateTask from "../other/CreateTask"
import AllTask from "../other/AllTask"

const AdminDashboard = ({ changeUser }) => {
  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <Header changeUser={changeUser} className="sticky top-0 z-50 bg-white border-b" />

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 space-y-10">

        {/* Create Task Section */}
        <section>
          <CreateTask />
        </section>

        {/* All Tasks Section */}
        <section>
          <h2 className="text-xl font-semibold mb-4">
            Employee Task Overview
          </h2>
          <AllTask />
        </section>

      </main>
    </div>
  )
}

export default AdminDashboard
