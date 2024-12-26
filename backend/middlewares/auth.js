const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.auth = (req, res, next) => {
    try {
        console.log("cookie" , req.cookies.token);
        console.log("body" , req.body.token);
        console.log("header", req.header("Authorization"));
        // Extract token from cookies, body, or headers
        const token =
            req.cookies.token ||
            req.body.token ||
            req.header('Authorization')?.replace('Bearer ', '');

        console.log("suraj")
        
        if(!token || token === undefined) {
            return res.status(401).json({
                success:false,
                message:'Authentication token is missing',
            });
        }

        // Verify token
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        console.log(payload);
        req.user = payload;

        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        console.error('Token verification error:', error.message);
        return res.status(401).json({
            success: false,
            message: 'Invalid or expired token',
            error: error.message,
        });
    }
};

