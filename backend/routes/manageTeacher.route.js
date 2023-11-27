import { Router } from "express";
import {
    createTeacher,
    getTeachers,
} from "../controller/teacher.controller.js";
import { auth } from "../middleware/auth.js";
import { hasRole } from "../middleware/role.js";
import { Roles } from "../models/user.model.js";
import { validate } from "../middleware/validate.middleware.js";
import { createTeacherSchema } from "../validation/teacher.schema.js";

const router = Router();

router.get("/", auth, hasRole(Roles.ADMIN), getTeachers);
router.post("/", auth, hasRole(Roles.ADMIN),validate(createTeacherSchema), createTeacher);

export default router;
