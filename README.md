# Task Management Application

## Images
### Login
![image](https://github.com/user-attachments/assets/c0aac00c-d5d8-4ac6-9ca6-b14fbfd67595)
### Register
![image](https://github.com/user-attachments/assets/97985696-3552-48f9-8500-c634df32bd91)
### Create New Task
![image](https://github.com/user-attachments/assets/99c7e79c-9492-4ba6-9e67-a74620bf4e82)
### Dashboard
![image](https://github.com/user-attachments/assets/925db778-aa6d-422d-a0e8-af664a894b8f)

## Video
### Frontend-backend working
https://github.com/user-attachments/assets/2db52e3b-a947-4546-b5a9-48dbc00ba3ee
### Backend Working
https://github.com/user-attachments/assets/df86c8cb-3be4-4cdf-8c69-451afd8f746d

## Overview

This project is a simple Task Management application where users can register, log in, create, update, delete, and view tasks. The tasks can also be marked as complete or incomplete.

## Architecture

- **Backend**: Node.js with Express for handling authentication, task management, and API endpoints.
- **Frontend**: React.js for the user interface, utilizing Tailwind CSS for responsive design.
- **Database**: MongoDB for storing users and tasks.
- **Authentication**: JWT (JSON Web Token) for secure authentication.

## Technology Stack

- **Backend**:
  - Node.js
  - Express
  - JWT for authentication
  - MongoDB (using Mongoose)
  - bcrypt (for hashing passwords)
  - dotenv (for environment variable management)

- **Frontend**:
  - React.js
  - Tailwind CSS for styling
  - Axios for API requests
  - React Router for page navigation

## File Structure

### Backend
```
backend/
│
├── config                  # MongoDB connection configuration
|   └── database.js
├── controllers/
│   ├── authController.js   # Handles registration and login
│   └── taskController.js   # Handles task operations (CRUD)
├── middlewares/
│   └── auth.js             # Middleware to authenticate JWT tokens
├── models/
│   ├── Task.js             # Task schema
│   └── User.js             # User schema
├── routes/
│   ├── taskRoutes.js       # Task-related routes
│   └── userRoutes.js       # User-related routes
└── server.js               # Main server file to run the app
```

### Frontend
```
frontend/
│
├── public/                    # Static files (index.html, images, etc.)
├── src/
│   ├── components/
|   |   └── TaskModal.js
│   ├── context/               # Authentication context
|   |   └── authContext.js
│   ├── pages/                 # React pages (Dashboard, Login, Registration)
|   |   ├── DashboardPage.js
|   |   ├── LoginPage.js
|   |   └── RegistrationPage.js
│   ├── App.js                 # Main App component
│   ├── index.css              # Global styles (including Tailwind)
│   └── index.js               # Entry point for React app
```

## How to Run the Application Locally

### Backend
1. **Clone the repository**:
   ```
   git clone https://github.com/surajkachate/simple-task-management-application.git
   cd backend
   ```

2. **Install dependencies**:
   ```
   npm install
   ```

3. **Set up environment variables**:
   Create a `.env` file in the `backend/` directory and add the following:
   ```
   PORT = 5000
   DATABASE_URL = your_mongodb_connection_string
   JWT_SECRET = your_jwt_secret
   ```

4. **Run the backend**:
   ```
   npm run dev
   ```

   The backend will run on `http://localhost:5000`.

### Frontend
1. **Clone the repository**:
   ```
   cd frontend
   ```

2. **Install dependencies**:
   ```
   npm install
   ```

3. **Set up environment variables**:
   Create a `.env` file in the `backend/` directory and add the following:
   ```
   REACT_APP_BASE_URL="http://localhost:5000/api"
   JWT_SECRET = your_jwt_secret
   ```

4. **Run the frontend**:
   ```
   npm start
   ```

   The frontend will be available at `http://localhost:3000`.

### API Endpoints
- `POST /api/register`: Register a new user.
- `POST /api/login`: Log in a user and get a JWT token.
- `GET /api/tasks`: Fetch all tasks for the logged-in user.
- `POST /api/tasks`: Add a new task.
- `PUT /api/tasks/:id`: Update a task's completion status.
- `DELETE /api/tasks/:id`: Delete a task.

## Architecture Explanation

### Backend
- **server.js**: Sets up the Express server, connects to the database, and includes routes.
- **config-database.js**: Handles MongoDB connection using Mongoose.
- **controllers**: Contains logic for handling requests like user registration, login, and task CRUD operations.
- **middlewares**: Includes an authentication middleware to verify JWT tokens before accessing certain routes.
- **models**: Defines the MongoDB schemas for users and tasks.
- **routes**: Defines the routes for user and task operations.

### Frontend
- **App.js**: The root component that sets up routes and context providers.
- **components**: Reusable components such as the Task Modal.
- **context**: Auth context to manage user authentication state.
- **pages**: Pages for login, registration, and dashboard, where tasks are listed and can be managed.

## Technology Stack Overview

- **React.js**: JavaScript library for building user interfaces.
- **Tailwind CSS**: Utility-first CSS framework for responsive and customizable designs.
- **Node.js & Express**: JavaScript runtime and framework for building APIs.
- **MongoDB & Mongoose**: NoSQL database and ORM for managing data.
- **JWT**: Secure token-based authentication for user login and task management.
