import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// --- ROUTES ---

// Health Check Route (Required for Render)
app.get("/", (req, res) => {
  res.status(200).json({ 
    status: "success", 
    message: "Order Tracking API is healthy and running!" 
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/orders", orderRoutes);

// --- SERVER START ---
// Render automatically provides a PORT env var (usually 10000)
const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});