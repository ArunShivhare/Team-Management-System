import React, { useContext, useEffect, useState } from "react"
import Login from "./components/Auth/Login"
import EmployeeDashboard from "./components/Dashboard/EmployeeDashboard"
import AdminDashboard from "./components/Dashboard/AdminDashboard"
import { AuthContext } from "./context/AuthProvider"

const App = () => {
  const { user, tasks, login, logout } = useContext(AuthContext)
  const [userRole, setUserRole] = useState(null)
  const [loggedInUserData, setLoggedInUserData] = useState(null)

  useEffect(() => {
    if (user) {
      setUserRole(user.role || 'employee')
      setLoggedInUserData({ ...user, tasks })
    } else {
      setUserRole(null)
      setLoggedInUserData(null)
    }
  }, [user, tasks])

  const handleLogin = async (email, password) => {
    try {
      await login(email, password)
    } catch (err) {
      alert(err.message || 'Login failed')
    }
  }

  return (
    <>
      {!userRole && <Login handleLogin={handleLogin} />}

      {userRole === "admin" && (
        <AdminDashboard changeUser={setUserRole} />
      )}

      {userRole === "employee" && (
        <EmployeeDashboard changeUser={setUserRole} data={loggedInUserData} />
      )}
    </>
  )
}

export default App
