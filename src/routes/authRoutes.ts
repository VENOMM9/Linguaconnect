// src/routes/authRoutes.ts
import express from "express";
import { registerUser, loginUser } from "../controllers/controller.js";

const authRouter = express.Router();

authRouter.post("/register", registerUser);
authRouter.post("/login", loginUser);

export default authRouter;
