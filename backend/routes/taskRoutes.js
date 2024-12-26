const express = require('express');
const router = express.Router();
const { auth } = require('../middlewares/auth');
const {
    getTasks,
    addTask,
    updateTask,
    deleteTask,
} = require("../controllers/taskController");

// Apply the auth middleware globally for all routes
router.use(auth);

router.get('/tasks', getTasks);
router.post('/tasks', addTask);
router.put('/tasks/:id', updateTask);
router.delete('/tasks/:id', deleteTask);

module.exports = router;
