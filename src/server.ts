import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectToMongoDB } from "./config/db";
import authRoutes from "./routes/authRoutes";
import tutorRoutes from "./routes/tutorRoutes";
import adminRoutes from "./routes/adminRoutes";

dotenv.config();
connectToMongoDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api", tutorRoutes);   // tutor routes
app.use("/api", adminRoutes);   // admin routes

// Health check route
app.get("/", (_req, res) => {
  res.send("LinguaConnect API is running 🚀");
});

// Error handling (basic)
app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

const PORT = process.env.PORT || 5300;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
