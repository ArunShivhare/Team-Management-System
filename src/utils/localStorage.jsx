// utils/localStorage.js

const EMPLOYEES_KEY = "employees"
const ADMIN_KEY = "admin"

// --------------------
// Default Data
// --------------------

const employeesData = [
  {
    id: 1,
    firstName: "Arjun",
    email: "e@e.com",
    password: "123",
    taskCounts: {
      active: 2,
      newTask: 1,
      completed: 1,
      failed: 0,
    },
    tasks: [
      {
        active: true,
        newTask: true,
        completed: false,
        failed: false,
        taskTitle: "Update website",
        taskDescription: "Revamp the homepage design",
        taskDate: "2024-10-12",
        category: "Design",
      },
      {
        active: false,
        newTask: false,
        completed: true,
        failed: false,
        taskTitle: "Client meeting",
        taskDescription: "Discuss project requirements",
        taskDate: "2024-10-10",
        category: "Meeting",
      },
      {
        active: true,
        newTask: false,
        completed: false,
        failed: false,
        taskTitle: "Fix bugs",
        taskDescription: "Resolve bugs reported in issue tracker",
        taskDate: "2024-10-14",
        category: "Development",
      },
    ],
  },
  // rest employees unchanged...
]

const adminData = [
  {
    id: 1,
    email: "admin@example.com",
    password: "123",
  },
]

// --------------------
// Initialize Storage
// --------------------

export const initializeLocalStorage = () => {
  if (!localStorage.getItem(EMPLOYEES_KEY)) {
    localStorage.setItem(
      EMPLOYEES_KEY,
      JSON.stringify(employeesData)
    )
  }

  if (!localStorage.getItem(ADMIN_KEY)) {
    localStorage.setItem(
      ADMIN_KEY,
      JSON.stringify(adminData)
    )
  }
}

// --------------------
// Getters
// --------------------

export const getLocalStorage = () => {
  try {
    const employees =
      JSON.parse(localStorage.getItem(EMPLOYEES_KEY)) || []
    const admin =
      JSON.parse(localStorage.getItem(ADMIN_KEY)) || []

    return { employees, admin }
  } catch (error) {
    console.error("LocalStorage parse error", error)
    return { employees: [], admin: [] }
  }
}

// --------------------
// Setters (Future-proof)
// --------------------

export const setEmployees = (employees) => {
  localStorage.setItem(
    EMPLOYEES_KEY,
    JSON.stringify(employees)
  )
}
