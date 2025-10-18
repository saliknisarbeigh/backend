require('dotenv').config();
const express = require("express");
const app = express();
const connectDb = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");

// CORS configuration for frontend
const allowedOrigins = [
  'https://inspiro-salik.vercel.app',
  'http://localhost:5173'
];



app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  })
);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
const authRouter = require("./routes/authRouter");
const sahabasRouter = require("./routes/sahabasRouter");
const prophetsRouter = require("./routes/prophetsRouter");
const inspireRouter = require("./routes/inspireRouter");
const productsRouter = require("./routes/productsRouter");

app.use("/", authRouter);
app.use("/api", sahabasRouter);
app.use("/api", prophetsRouter);
app.use("/api", inspireRouter);
app.use("/api", productsRouter);

// Basic route
app.get("/", (req, res) => {
  res.json({ message: "Backend server is running!" });
});

// Health check route


// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

// Database connection and server startup
connectDb()
  .then(() => {
    console.log("Database connection successful");
    app.listen(3000, () => {
      console.log("Server successfully running on port 3000");
    });
  })
  .catch((err) => {
    console.log(err, "Database connection failed");
  });

module.exports = app;
