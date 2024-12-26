const express = require("express");
const dotenv = require('dotenv');
const dbConnect = require("./config/database");
const userRoutes = require("./routes/userRoutes");
const taskRoutes = require("./routes/taskRoutes");
const cors = require("cors");

dotenv.config();
dbConnect();

const app = express();

app.use(cors());
// Middleware
app.use(express.json());

const cookieParser = require("cookie-parser");
app.use(cookieParser());

// Routes
app.use('/api/user', userRoutes);
app.use('/api/task', taskRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));