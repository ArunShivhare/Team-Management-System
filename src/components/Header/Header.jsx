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
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/70 border-b">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Left Section */}
        <div className="flex items-center gap-4">

          {/* Logo */}
          <div className="p-3 rounded-xl bg-linear-to-br from-purple-600 to-blue-500 shadow-md">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
            </svg>
          </div>

          {/* Greeting */}
          <div>
            <h1 className="text-xl md:text-2xl font-semibold">
              Hello, <span className="bg-linear-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">{username}</span>
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Welcome back to <span className="font-medium">Employee Manager</span>
            </p>
          </div>

        </div>

        {/* Right Section */}
        <div>
          <button
            onClick={logOutUser}
            className="px-5 py-2 rounded-xl text-sm font-medium text-white bg-linear-to-r from-purple-600 to-blue-500 hover:opacity-90 shadow-sm transition"
          >
            Logout
          </button>
        </div>

      </div>
    </header>
  )
}

export default Header
