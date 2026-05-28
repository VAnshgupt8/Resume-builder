require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const resumeRoutes = require("./routes/resumeRoutes");

const app = express();

app.use(cors({
  origin: 'https://resume-builder-6-vx4y.onrender.com' 
}));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend Running Successfully");
});

app.use("/api/auth", authRoutes);
app.use("/api/resume", resumeRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });