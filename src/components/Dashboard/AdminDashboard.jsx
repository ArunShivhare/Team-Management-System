import React, { useContext } from "react"
import Header from "../Header/Header"
import CreateTask from "../other/CreateTask"
import AllTask from "../other/AllTask"
import AddEmployee from "../Admin/AddEmployee"
import UserList from "../Admin/UserList"
import Footer from "../Footer/Footer"
import { useState } from "react"

import { AuthContext } from "../../context/AuthProvider"

const AdminDashboard = ({ changeUser }) => {
  const [refresh, setRefresh] = useState(false)
  const { user } = useContext(AuthContext)

  return (
  <div className="min-h-screen bg-linear-to-br from-purple-50 via-white to-blue-50">

    {/* Header */}
    <Header data={user} changeUser={changeUser} className="sticky top-0 z-50 backdrop-blur bg-white/70 border-b border-gray-200" />

    {/* Content */}
    <main className="max-w-7xl mx-auto px-4 py-10 space-y-10">

      {/* Page Title */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl md:text-4xl font-bold bg-linear-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
          Admin Dashboard ⚙️
        </h1>
        <p className="text-gray-500">
          Manage tasks, employees and workflow efficiently
        </p>
      </div>

      {/* Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* LEFT SIDE */}
        <div className="md:col-span-2 space-y-6">

          {/* Create Task */}
          <section className="bg-white rounded-2xl shadow-sm border p-6 hover:shadow-md transition">
            <h2 className="text-xl font-semibold mb-4">Create Task</h2>
            <CreateTask />
          </section>

          {/* Task Overview */}
          <section className="bg-white rounded-2xl shadow-sm border p-6 hover:shadow-md transition">
            <h2 className="text-xl font-semibold mb-4">Employee Task Overview</h2>
            <AllTask />
          </section>

        </div>

        {/* RIGHT SIDE */}
        <aside className="space-y-6">

          {/* Add Employee */}
          <section className="bg-white rounded-2xl shadow-sm border p-6 hover:shadow-md transition">
            <h2 className="text-xl font-semibold mb-4">Add Employee</h2>
            <AddEmployee onAdded={() => setRefresh(r => !r)} />
          </section>

          {/* User List */}
          <section className="bg-white rounded-2xl shadow-sm border p-6 hover:shadow-md transition">
            <h2 className="text-xl font-semibold mb-4">Employee List</h2>
            <UserList refresh={refresh} />
          </section>

        </aside>
      </div>

    </main>

    {/* Footer */}
    <Footer />
  </div>
  )
}

export default AdminDashboard
