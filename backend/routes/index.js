import { Router } from "express";
import authRoutes from "./auth.route.js";
import manageTeacherRoutes from "./manageTeacher.route.js";
import fileRoute from "./file.route.js";
import studentRoute from "./student.route.js";
import classRoute from "./class.route.js";
import eventsRoute from "./event.route.js";
import feedRoute from "./feed.route.js";
import forumRoute from "./forum.route.js";
import pvRoute from "./pv.route.js";
import sickRoute from "./sick.route.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/manageTeacher", manageTeacherRoutes);
router.use("/class", classRoute);
router.use("/student", studentRoute);
router.use("/file", fileRoute);
router.use("/events", eventsRoute);
router.use("/feed", feedRoute);
router.use("/forum", forumRoute);
router.use("/pv", pvRoute);
router.use("/sickRest", sickRoute);

export default router;
