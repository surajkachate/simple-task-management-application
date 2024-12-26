const express = require("express");
const router = express.Router();
const { login, signup } = require("../Controllers/authController");

// User Registration
// POST /register
// Validates input and creates a new user
router.post("/register", signup);

// User Login
// POST /login
// Authenticates user and returns a JWT token
router.post("/login", login);

module.exports = router;