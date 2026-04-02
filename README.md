### Pro-Tasker – Full Stack Task Management App
Pro-Tasker is a full-stack task management application that allows users to create projects, manage tasks, track progress, and organize work efficiently with a modern UI.

 ## Features

   # Authentication
   * User registration & login
   * JWT-based authentication
   * Protected routes (frontend & backend)

   # Project Management
   * Create new projects
   * View all user-specific projects
   * Secure project ownership

   # Task Management
   * Create tasks within a project
   * Update task details (title, description)
   * Delete tasks
   * Change task status:
      - To Do
      - In Progress
      - Done

   # Advanced Task Features
    * Priority levels (Low / Medium / High)
    * Due dates
    * Task filtering: 
      - Status filter
      - Priority filter
    * Search tasks
    * Task analytics dashboard

   # UI/UX
    * Professional modal-based task creation
    * Clean dashboard layout
    * Responsive design
    * No prompt-based UI (modern UX)

 ## Tech Stack

   # Frontend
   * React (Vite)
   * Axios
   * React Router DOM
   * Context API

   # Backend
   * Node.js
   * Express.js
   * MongoDB (Mongoose)
   * JWT Authentication

## Project Structure

pro-tasker/
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── config/
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── context/
│   │   └── services/
│
└── README.md

## Setup Instructions

  1- Clone the Repository
   
    git clone  https://github.com/ritanayak/pro-tasker.git

     cd pro-tasker

  2- Backend Setup

      cd backend

      npm install

   # Create .env file:
    PORT=3000

    MONGO_URI=your_mongodb_connection_string

    JWT_SECRET=your_secret_key

   # Run Backend:
    npm run dev

 3- Frontend Setup

     cd frontend

     npm install

  # Create .env file:

    VITE_BASE_URL=http://localhost:3000

   # Run Frontend:
     npm run dev

 ## API Endpoints
 
  # Auth
   * POST /api/auth/register
   * POST /api/auth/login
  # Projects
   * GET /api/projects
   * POST /api/projects
  # Tasks
   * GET /api/projects/:projectId/tasks
   * POST /api/projects/:projectId/tasks
   * PATCH /api/projects/:projectId/tasks/:taskId
   * PATCH /api/projects/:projectId/tasks/:taskId/status
   * DELETE /api/projects/:projectId/tasks/:taskId
   * GET /api/projects/:projectId/tasks/analytics

 ## Testing

  # Backend (Postman)
  1. Register user
  2. Login → get token
  3. Add token in Authorization header:

     Bearer <token>

   4. Test project & task APIs

  # Frontend
   * Register → Login
   * Create project
   * Add tasks
   * Filter/search tasks
   * Update status & priority

 ## Analytics Example
   * Total tasks
   * Pending tasks
   * In Progress tasks
   * Completed tasks
   * High priority tasks

 ## Security
  * JWT Authentication
  * Protected API routes
  * User-specific data access
  * Password hashing (via model methods)
     



   