import React, { useContext, useEffect, useState } from "react"
import Login from "./components/Auth/Login"
import EmployeeDashboard from "./components/Dashboard/EmployeeDashboard"
import AdminDashboard from "./components/Dashboard/AdminDashboard"
import { AuthContext } from "./context/AuthProvider"

const App = () => {
  const [userRole, setUserRole] = useState(null)
  const [loggedInUserData, setLoggedInUserData] = useState(null)
  const {employees} = useContext(AuthContext)

  // Load session on refresh
  useEffect(() => {
    const storedUser = localStorage.getItem("loggedInUser")

    if (storedUser) {
      const parsedUser = JSON.parse(storedUser)
      setUserRole(parsedUser.role || null)
      setLoggedInUserData(parsedUser.data || null)
    }
  }, [])

  const handleLogin = (email, password) => {
    // Admin login
    if (email === "admin@me.com" && password === "123") {
      setUserRole("admin")
      localStorage.setItem(
        "loggedInUser",
        JSON.stringify({ role: "admin" })
      )
      return
    }

    // Employee login
    if (employees?.length) {
      const employee = employees.find(
        (e) => e.email === email && e.password === password
      )

      if (employee) {
        setUserRole("employee")
        setLoggedInUserData(employee)
        localStorage.setItem(
          "loggedInUser",
          JSON.stringify({ role: "employee", data: employee })
        )
        return
      }
    }

    // Invalid credentials
    alert("Invalid email or password")
  }

  return (
    <>
      {!userRole && <Login handleLogin={handleLogin} />}

      {userRole === "admin" && (
        <AdminDashboard changeUser={setUserRole} />
      )}

      {userRole === "employee" && (
        <EmployeeDashboard
          changeUser={setUserRole}
          data={loggedInUserData}
        />
      )}
    </>
  )
}

export default App
