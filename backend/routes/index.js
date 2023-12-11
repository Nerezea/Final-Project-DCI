import { Router } from "express";
import authRoutes from "./auth.route.js";
import manageTeacherRoutes from "./manageTeacher.route.js";
import fileRoute from "./file.route.js";
import studentRoute from "./student.route.js";
import classRoute from "./class.route.js";
//import eventsRoute from "./event.route.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/manageTeacher", manageTeacherRoutes);
router.use("/class", classRoute);
router.use("/student", studentRoute);
router.use("/file", fileRoute);
//router.use("/events", eventsRoute)

export default router;
