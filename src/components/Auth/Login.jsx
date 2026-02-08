import React, { useState } from "react"

const Login = ({ handleLogin }) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const submitHandler = (e) => {
    e.preventDefault()

    if (!email || !password) {
      setError("Please enter email and password")
      return
    }

    setError("")
    handleLogin(email, password)

    setEmail("")
    setPassword("")
  }

  return (
    <div className="flex items-center justify-center px-4 py-40 bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg border p-8">

        {/* Heading */}
        <h1 className="text-2xl font-bold text-center">
          Welcome back 👋
        </h1>
        <p className="text-sm text-gray-500 text-center mt-2">
          Sign in to continue to{" "}
          <span className="font-medium">EMP</span>
        </p>

        {/* Social Buttons (UI only for now) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-8">
          {["Google", "GitHub", "LinkedIn", "Apple"].map((provider) => (
            <button
              key={provider}
              type="button"
              className="flex items-center justify-center gap-2 border rounded-lg px-4 py-2 text-sm font-medium hover:bg-gray-100 transition"
            >
              {provider}
            </button>
          ))}
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4 my-6">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-xs text-gray-400">OR</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        {/* Email Login */}
        <form className="space-y-4" onSubmit={submitHandler}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email address"
            className="w-full px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black"
          />

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black"
          />

          {/* Error message */}
          {error && (
            <p className="text-xs text-red-500">
              {error}
            </p>
          )}

          <div className="text-right">
            <span className="text-xs text-gray-500 hover:underline cursor-pointer">
              Forgot password?
            </span>
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white rounded-lg py-2 text-sm font-medium hover:bg-gray-900 transition"
          >
            Sign in
          </button>
        </form>

        {/* Footer */}
        <p className="text-xs text-gray-400 text-center mt-6">
          By continuing, you agree to our Terms & Privacy Policy
        </p>
      </div>
    </div>
  )
}

export default Login
