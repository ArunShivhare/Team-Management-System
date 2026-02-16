import React, { createContext, useEffect, useState } from "react"

export const AuthContext = createContext(null)

const API = import.meta.env.VITE_API_URL || "http://localhost:5000/api"

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [token, setToken] = useState(null)
    const [tasks, setTasks] = useState([])

    useEffect(() => {
        const stored = localStorage.getItem("auth")
        if (stored) {
            const parsed = JSON.parse(stored)
            setUser(parsed.user)
            setToken(parsed.token)
            fetchTasks(parsed.token)
        }
    }, [])

    const authFetch = (path, opts = {}) => {
        const headers = opts.headers || {}
        if (token) headers["Authorization"] = `Bearer ${token}`
        headers["Content-Type"] = headers["Content-Type"] || "application/json"
        return fetch(`${API}${path}`, { ...opts, headers })
    }

    const login = async (email, password) => {
        const res = await fetch(`${API}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        })

        const body = await res.json()
        if (!res.ok) throw new Error(body.message || "Login failed")

        setUser(body.user)
        setToken(body.token)
        localStorage.setItem("auth", JSON.stringify({ user: body.user, token: body.token }))
        fetchTasks(body.token)
        return body
    }

    const register = async (name, email, password) => {
        const res = await fetch(`${API}/auth/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password })
        })
        const body = await res.json()
        if (!res.ok) throw new Error(body.message || "Register failed")
        setUser(body.user)
        setToken(body.token)
        localStorage.setItem("auth", JSON.stringify({ user: body.user, token: body.token }))
        fetchTasks(body.token)
        return body
    }

    const logout = () => {
        setUser(null)
        setToken(null)
        setTasks([])
        localStorage.removeItem("auth")
    }

    const fetchTasks = async (overrideToken) => {
        try {
            const t = overrideToken || token
            if (!t) return
            const res = await fetch(`${API}/tasks`, { headers: { Authorization: `Bearer ${t}` } })
            if (!res.ok) return
            const data = await res.json()
            setTasks(data)
        } catch (err) {
            console.error('fetchTasks error', err)
        }
    }

    const fetchUsers = async () => {
        try {
            const res = await fetch(`${API}/users`, { headers: { Authorization: `Bearer ${token}` } })
            if (!res.ok) return []
            const data = await res.json()
            return data
        } catch (err) {
            console.error('fetchUsers error', err)
            return []
        }
    }

    const createTask = async ({ title, description, category, taskDate, assignedTo }) => {
        const res = await authFetch('/tasks', { method: 'POST', body: JSON.stringify({ title, description, category, taskDate, assignedTo }) })
        if (!res.ok) throw new Error('Create task failed')
        const body = await res.json()
        setTasks(s => [body, ...s])
        return body
    }

    const updateTask = async (id, updates) => {
        const res = await authFetch(`/tasks/${id}`, { method: 'PUT', body: JSON.stringify(updates) })
        if (!res.ok) throw new Error('Update task failed')
        const body = await res.json()
        setTasks(s => s.map(t => t._id === body._id ? body : t))
        return body
    }

    return (
        <AuthContext.Provider value={{ user, token, tasks, login, register, logout, createTask, updateTask, fetchTasks, fetchUsers }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider
