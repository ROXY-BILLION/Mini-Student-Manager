const express = require("express");
const app = express();
const connectDB = require("./config/db");
const studentRoutes = require("./routes/studentRoutes");
const cors = require("cors");
require("dotenv").config();

app.use(cors({ origin: "https://mini-student-manager.vercel.app" }));
app.use(express.json());
app.use("/api/students", studentRoutes);


app.get("/", (req, res) => {
    res.json({
        message:"Student api running"
    })
})
connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`server is running on ${PORT}`)
}) 