import React from "react"
import Header from "../Header/Header"
import CreateTask from "../other/CreateTask"
import AllTask from "../other/AllTask"
import AddEmployee from "../Admin/AddEmployee"
import UserList from "../Admin/UserList"
import { useState } from "react"

const AdminDashboard = ({ changeUser }) => {
  const [refresh, setRefresh] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <Header changeUser={changeUser} className="sticky top-0 z-50 bg-white border-b" />

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 space-y-10">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <section>
              <CreateTask />
            </section>

            <section className="mt-6">
              <h2 className="text-xl font-semibold mb-4">Employee Task Overview</h2>
              <AllTask />
            </section>
          </div>

          <aside className="space-y-6">
            <section>
              <AddEmployee onAdded={() => setRefresh(r => !r)} />
            </section>

            <section>
              <UserList refresh={refresh} />
            </section>
          </aside>
        </div>

      </main>
    </div>
  )
}

export default AdminDashboard
