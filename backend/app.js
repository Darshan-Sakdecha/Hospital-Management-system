import express from 'express';
import cors from "cors";
import morgan from "morgan";

const app = express();

// Middleware
app.use(cors());              // allow frontend connection
app.use(express.json());      // parse JSON data
app.use(morgan("dev"));

import { logger } from './middlewares/logger.middleware.js';
app.use(logger);

import authRoutes from "./routes/auth.routes.js";
app.use("/api/auth", authRoutes);

// Test Route
app.get("/", (req, res) => {
    res.send("API is running...");
});

export { app };