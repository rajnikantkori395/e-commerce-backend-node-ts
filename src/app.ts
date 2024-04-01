import express, { Request, Response, NextFunction } from "express";
import "dotenv/config";
import mongoose from "mongoose";
import config from "./config";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import morgan from "morgan";
import cors from "cors";
import authRoutes from "./routes/authRoutes";
import productRoutes from "./routes/productsRoutes";
import cartRoutes from "./routes/cartRoutes";
import paymentRoutes from "./routes/payments";
import orderRoutes from "./routes/orders";
const app = express();

mongoose
  .connect(config.mongoURI)
  .then(() => {
    console.log("MongoDB Connected");
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB Connection Error:", err);
  });

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
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/payment", paymentRoutes);

// Error Handling Middleware
const errorHandler: express.ErrorRequestHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
};
app.use(errorHandler);
console.log("hello");
