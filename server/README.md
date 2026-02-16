# EMS Server (Express + MongoDB)

Quick backend scaffold for the Employee Management System.

Setup

1. Copy `.env.example` to `.env` and fill `MONGO_URI` and `JWT_SECRET`.

2. Install dependencies and run:

```bash
cd server
npm install
npm run dev
```

API Endpoints

- `POST /api/auth/register` — register user
- `POST /api/auth/login` — login, returns JWT
- `GET /api/tasks` — get current user tasks (requires `Authorization: Bearer <token>`)
- `POST /api/tasks` — create task
- `PUT /api/tasks/:id` — update task
- `DELETE /api/tasks/:id` — delete task

Notes

- This is a minimal scaffold. Adjust models, validation, and error handling as needed.
