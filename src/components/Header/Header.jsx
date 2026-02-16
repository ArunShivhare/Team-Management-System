import React, { useContext } from "react"
import { AuthContext } from "../../context/AuthProvider"

const Header = ({ changeUser, data }) => {
  const { logout } = useContext(AuthContext)
  const username = data?.name || data?.firstName || "User"

  const logOutUser = () => {
    logout()
    if (changeUser) changeUser(null)
  }

  return (
    <header className="w-full bg-white border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-10 flex items-center justify-between">

        {/* Left: Big Greeting */}
        <div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
            Hello, {username} 👋
          </h1>
          <p className="text-base md:text-lg text-gray-500 mt-2">
            Welcome back to <span className="font-medium">EMP</span>
          </p>
        </div>

        {/* Right: Logout */}
        <button
          onClick={logOutUser}
          className="px-6 py-3 text-sm md:text-base font-semibold border-2 border-black rounded-xl hover:bg-black hover:text-white transition-all duration-300"
        >
          Log out
        </button>

      </div>
    </header>
  )
}

export default Header
