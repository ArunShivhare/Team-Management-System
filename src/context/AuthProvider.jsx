import React, { createContext, useEffect, useState } from "react"

export const AuthContext = createContext(null)

const API = import.meta.env.VITE_API_URL || "http://localhost:5000/api"

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [token, setToken] = useState(null)
    const [tasks, setTasks] = useState([])
    const [employees, setEmployees] = useState([])

    useEffect(() => {
        (async () => {
            const stored = localStorage.getItem("auth")
            if (stored) {
                const parsed = JSON.parse(stored)
                setUser(parsed.user)
                setToken(parsed.token)
                await fetchTasks(parsed.token)
                await loadEmployees(parsed.token)
            }
        })()
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
        await fetchTasks(body.token)
        await loadEmployees(body.token)
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
        await fetchTasks(body.token)
        await loadEmployees(body.token)
        return body
    }

    const logout = () => {
        setUser(null)
        setToken(null)
        setTasks([])
        setEmployees([])
        localStorage.removeItem("auth")
    }

    const fetchTasks = async (overrideToken) => {
        try {
            const t = overrideToken || token
            if (!t) return []
            const res = await fetch(`${API}/tasks`, { headers: { Authorization: `Bearer ${t}` } })
            if (!res.ok) return []
            const data = await res.json()
            setTasks(data)
            return data
        } catch (err) {
            console.error('fetchTasks error', err)
            return []
        }
    }

    const fetchUsers = async (overrideToken) => {
        try {
            const t = overrideToken || token
            if (!t) return []
            const res = await fetch(`${API}/users`, { headers: { Authorization: `Bearer ${t}` } })
            if (!res.ok) return []
            const data = await res.json()
            return data
        } catch (err) {
            console.error('fetchUsers error', err)
            return []
        }
    }

    const loadEmployees = async (overrideToken) => {
        try {
            const t = overrideToken || token
            if (!t) return setEmployees([])
            const users = await fetchUsers(t)
            const tasksData = await fetchTasks(t)
            const list = (users || []).map(u => {
                const uid = (u._id || u.id || u.email).toString()
                const counts = { newTask: 0, active: 0, completed: 0, failed: 0 }
                ;(tasksData || []).forEach(task => {
                    const assigned = task.assignedTo ? (task.assignedTo._id || task.assignedTo).toString() : null
                    if (!assigned || assigned !== uid) return
                    const s = task.status || 'new'
                    if (s === 'new') counts.newTask++
                    else if (s === 'accepted') counts.active++
                    else if (s === 'completed') counts.completed++
                    else if (s === 'failed') counts.failed++
                })
                return { id: uid, name: u.name, email: u.email, taskCounts: counts }
            })
            setEmployees(list)
            return list
        } catch (err) {
            console.error('loadEmployees error', err)
            setEmployees([])
            return []
        }
    }

    const createTask = async ({ title, description, category, taskDate, assignedTo }) => {
        const res = await authFetch('/tasks', { method: 'POST', body: JSON.stringify({ title, description, category, taskDate, assignedTo }) })
        if (!res.ok) throw new Error('Create task failed')
        const body = await res.json()
        setTasks(s => [body, ...s])
        // refresh aggregated employee counts
        loadEmployees()
        return body
    }

    const updateTask = async (id, updates) => {
        const res = await authFetch(`/tasks/${id}`, { method: 'PUT', body: JSON.stringify(updates) })
        if (!res.ok) throw new Error('Update task failed')
        const body = await res.json()
        setTasks(s => s.map(t => t._id === body._id ? body : t))
        // refresh aggregated employee counts
        loadEmployees()
        return body
    }

    return (
        <AuthContext.Provider value={{ user, token, tasks, employees, login, register, logout, createTask, updateTask, fetchTasks, fetchUsers, loadEmployees }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider
