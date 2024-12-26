const express = require('express');
const router = express.Router();
const { auth } = require('../middlewares/auth');
const {
    getTasks,
    addTask,
    updateTask,
    deleteTask,
    updateTaskDetails
} = require("../controllers/taskController");

// Apply the auth middleware globally for all routes
router.use(auth);

// GET /tasks
// Get all tasks
router.get('/tasks', getTasks);

// POST /tasks
// Create tasks
router.post('/tasks', addTask);

// PUT /task-details/:id
// Update task details
router.put('/task-details/:id', updateTaskDetails);

// PUT /tasks/:id
// Update task completed or not
router.put('/tasks/:id', updateTask);

// DELETE /tasks/:id
// Delete task
router.delete('/tasks/:id', deleteTask);

module.exports = router;
