import { Router } from "express";
import authRoutes from "./auth.route.js";
import manageTeacherRoutes from "./manageTeacher.route.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/manageTeacher", manageTeacherRoutes);

export default router;
