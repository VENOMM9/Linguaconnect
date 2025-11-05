// src/routes/authRoutes.ts
import express from "express";
import { authenticate } from "../middleware/authMiddleware";

import { registerUser, loginUser } from "../controllers/authController.js";
import { validateRegister, validateLogin } from "../validate/validate";

import { getApprovedTutors } from "../controllers/tutorController.js";


const authRouter = express.Router();

authRouter.post("/register", validateRegister,  registerUser);
authRouter.post("/login", validateLogin, loginUser);
authRouter.get("/approved-tutors", authenticate, getApprovedTutors);


export default authRouter;
