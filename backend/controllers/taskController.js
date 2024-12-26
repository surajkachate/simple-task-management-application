const Task = require('../models/Task');

// Fetch all tasks for the logged-in user
const getTasks = async (req, res) => {
    console.log(req)
    try {
        const tasks = await Task.find({ userId: req.user._id });
        res.status(200).json({ success: true, data: tasks });
    } catch (error) {
        console.error('Error fetching tasks:', error.message);
        res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
};

// Add a new task
const addTask = async (req, res) => {
    const { title, description } = req.body;

    if (!title) {
        return res.status(400).json({ success: false, message: 'Task title is required' });
    }

    try {
        const task = await Task.create({ userId: req.user._id, title, description });
        res.status(201).json({ success: true, data: task });
    } catch (error) {
        console.error('Error adding task:', error.message);
        res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
};

// Update a task's title and description
const updateTaskDetails = async (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;

    if (!title && !description) {
        return res.status(400).json({ 
            success: false, 
            message: 'At least one of title or description is required to update' 
        });
    }

    try {
        const updatedFields = {};
        if (title) updatedFields.title = title;
        if (description) updatedFields.description = description;

        const task = await Task.findByIdAndUpdate(
            id,
            { $set: updatedFields },
            { new: true, runValidators: true }
        );

        if (!task) {
            return res.status(404).json({ success: false, message: 'Task not found' });
        }

        res.status(200).json({ success: true, data: task });
    } catch (error) {
        console.error('Error updating task details:', error.message);
        res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
};

// Update a task's completion status
const updateTask = async (req, res) => {
    const { id } = req.params;
    const { completed } = req.body;

    if (typeof completed !== 'boolean') {
        return res.status(400).json({ success: false, message: 'Invalid completion status' });
    }

    try {
        const task = await Task.findByIdAndUpdate(
            id,
            { completed },
            { new: true, runValidators: true }
        );

        if (!task) {
            return res.status(404).json({ success: false, message: 'Task not found' });
        }

        res.status(200).json({ success: true, data: task });
    } catch (error) {
        console.error('Error updating task:', error.message);
        res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
};

// Remove a task
const deleteTask = async (req, res) => {
    const { id } = req.params;

    try {
        const task = await Task.findByIdAndDelete(id);

        if (!task) {
            return res.status(404).json({ success: false, message: 'Task not found' });
        }

        res.status(200).json({ success: true, message: 'Task deleted successfully' });
    } catch (error) {
        console.error('Error deleting task:', error.message);
        res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
};

module.exports = {
    getTasks,
    addTask,
    updateTaskDetails,
    updateTask,
    deleteTask
};
