require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const ApiLog = require("./models/ApiLog"); // Import the model

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/your-db-name')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB', err));


// Sample API Route to Log Requests
app.post("/log-api", async (req, res) => {
    try {
        const {
            endpoint,
            requestType,
            responseTime,
            statusCode
        } = req.body;

        const log = new ApiLog({
            endpoint,
            requestType,
            responseTime,
            statusCode
        });
        await log.save();

        res.status(201).json({
            message: "API Log saved",
            data: log
        });
    } catch (error) {
        res.status(500).json({
            message: "Error saving log",
            error
        });
    }
});

// Start the Server
app.listen(PORT, () => {
    console.log(`✅ Server is running on http://localhost:${PORT}`);
});
