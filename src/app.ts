import express, { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import config from "./config";
import authRoutes from "./routes/authRoutes";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import morgan from "morgan";
import cors from "cors";

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Rate Limiting Middleware
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Morgan Middleware for logging HTTP requests
app.use(morgan("combined"));

// Routes
app.use("/api/auth", authRoutes);

// Error Handling Middleware
const errorHandler: express.ErrorRequestHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
};
app.use(errorHandler);
console.log("hello");


mongoose.connect(config.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true } as any)
  .then(() => {
    console.log('MongoDB Connected');
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB Connection Error:', err);
  });
