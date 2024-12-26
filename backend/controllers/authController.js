const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { options } = require("../routes/userRoutes");
require("dotenv").config();


//signup route handler
exports.signup = async (req, res) => {
    try {
        // Get data from request body
        const { name, email, password } = req.body;

        // Validate input fields
        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required',
            });
        }

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'User already exists',
            });
        }

        // Secure password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const user = new User({
            name,
            email,
            password: hashedPassword,
        });

        await user.save();

        // Return success response
        return res.status(201).json({
            success: true,
            message: 'User created successfully',
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
        });

    } catch (error) {
        console.error('Error during signup:', error.message);
        return res.status(500).json({
            success: false,
            message: 'User cannot be registered, please try again later',
        });
    }
};


//login
exports.login = async (req, res) => {
    try {
        // Fetch data from request body
        const { email, password } = req.body;

        // Validate email and password
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Please provide both email and password',
            });
        }

        // Check if user is registered
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'User is not registered',
            });
        }

        // Verify password
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(403).json({
                success: false,
                message: 'Incorrect password',
            });
        }

        // Generate JWT token
        const payload = {
            _id: user._id,
            email: user.email,
            name: user.name
        };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '2h' });

        // Remove password from user object
        const userWithoutPassword = user.toObject();
        userWithoutPassword.password = undefined;
        userWithoutPassword.token = token;

        // Set token in HTTP-only cookie
        const cookieOptions = {
            expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days
            httpOnly: true,
        };

        res.cookie('token', token, cookieOptions).status(200).json({
            success: true,
            token,
            user: userWithoutPassword,
            message: 'User logged in successfully',
        });
    } catch (error) {
        console.error('Error during login:', error.message);
        return res.status(500).json({
            success: false,
            message: 'Login failed, please try again later',
        });
    }
};