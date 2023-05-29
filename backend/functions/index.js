const express = require("express");
const { userRouter } = require("./routes/userRouter");
const { chatRouter } = require("./routes/chatRouter");
const { messageRouter } = require("./routes/messageRouter");
const { isAuthenticated } = require("./middleware/authentication");
const cors = require("cors");
const { onRequest } = require("firebase-functions/v1/https");

const app = express();

// Initilizing cors otherwise frontend is not able to connect
app.use(cors());

// Depecting if server is working or not
app.get("/", (req, res) => {
    res.send("API is Running");
});

// Testing Authenticated Endpoint
app.get("/data", isAuthenticated, (req, res) => {
    res.send("Test Auth");
});

// Major Routes
app.use("/user", userRouter);
app.use("/chat", chatRouter);
app.use("/message", messageRouter);

exports.app = onRequest(app);
