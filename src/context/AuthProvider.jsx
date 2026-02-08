import React, { createContext, useEffect, useState } from "react"
import { getLocalStorage, initializeLocalStorage, } from "../utils/localStorage"

export const AuthContext = createContext(null)

const AuthProvider = ({ children }) => {
    const [employees, setEmployees] = useState([])

    useEffect(() => {
        // Initialize localStorage only if empty
        initializeLocalStorage()
        const { employees } = getLocalStorage()
        setEmployees(employees)
    }, [])

return (
    <AuthContext.Provider value={{ employees, setEmployees }}>
        {children}
    </AuthContext.Provider>
)
}

export default AuthProvider
