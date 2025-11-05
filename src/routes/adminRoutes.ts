import express from "express";
import { authenticate } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";
import { getPendingTutors, getAllTutors, approveTutor, updateTutor, deleteTutor } from "../controllers/tutorController.js";

const adminRouter = express.Router();

adminRouter.get("/admin/tutors/pending", authenticate, authorizeRoles(["admin"]), getPendingTutors);
adminRouter.get("/admin/tutors", authenticate, authorizeRoles(["admin"]), getAllTutors);
adminRouter.patch("/admin/tutors/:tutorId/approve", authenticate, authorizeRoles(["admin"]), approveTutor);
adminRouter.put("/admin/tutors/:tutorId", authenticate, authorizeRoles(["admin"]), updateTutor);
adminRouter.delete("/admin/tutors/:tutorId", authenticate, authorizeRoles(["admin"]), deleteTutor);

export default adminRouter;
