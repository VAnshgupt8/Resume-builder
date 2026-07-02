const express = require("express");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: path.join(__dirname, ".env") });

const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const resumeRoutes = require("./routes/resumeRoutes");
const atsRoutes = require("./routes/atsRoutes");
const aiRoutes = require("./routes/aiRoutes");

const errorHandler = require(
  "./middleware/errorHandler"
);

connectDB();

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://resume-builder-frontend.vercel.app",
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("CORS not allowed"));
    }
  },
  credentials: true,
}));

app.use(express.json());

app.use(
  helmet()
);

app.use(
  rateLimit({
    windowMs:
      15 * 60 * 1000,
    max: 100
  })
);

app.get("/", (req, res) => {
  res.send(
    "Resume Builder API Running"
  );
});

app.use(
  "/api/auth",
  authRoutes
);

app.use(
  "/api/resume",
  resumeRoutes
);

app.use(
  "/api/ats",
  atsRoutes
);

app.use(
  "/api/ai",
  aiRoutes
);

app.use(
  errorHandler
);

const PORT =
  process.env.PORT || 5000;

app.listen(PORT, () => {

  console.log(
    `Server Running On Port ${PORT}`
  );

});