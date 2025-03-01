const mongoose = require("mongoose");

const apiLogSchema = new mongoose.Schema({
    endpoint: String,
    requestType: String,
    responseTime: Number,
    statusCode: Number,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("ApiLog", apiLogSchema);
