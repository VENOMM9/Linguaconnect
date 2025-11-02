import express from "express";
import { authenticate } from "../middleware/authMiddleware";
import { authorizeRoles } from "../middleware/roleMiddleware";
import { applyTutor, getMyProfile } from "../controllers/tutorController";

const tutorRouter = express.Router();

// Tutors only
tutorRouter.post("/tutor/application", authenticate, authorizeRoles(["tutor"]), applyTutor);
tutorRouter.get("/tutor/my-profile", authenticate, authorizeRoles(["tutor"]), getMyProfile);

export default tutorRouter;
