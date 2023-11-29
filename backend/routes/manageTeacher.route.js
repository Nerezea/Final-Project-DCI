import { Router } from "express";
import {
  createTeacher,
  deleteTeacher,
  getTeachers,
  updateTeacher,
} from "../controller/teacher.controller.js";
import { auth } from "../middleware/auth.js";
import { hasRole } from "../middleware/role.js";
import { Roles } from "../models/user.model.js";
import { validate } from "../middleware/validate.middleware.js";
import { createTeacherSchema } from "../validation/teacher.schema.js";

const router = Router();

router.get("/", auth, hasRole(Roles.MANAGER), getTeachers);
router.post(
  "/",
  auth,
  hasRole(Roles.MANAGER),
  validate(createTeacherSchema),
  createTeacher
);
router.delete("/:teacherId", auth, hasRole(Roles.MANAGER), deleteTeacher);
router.put("/:teacherId", auth, hasRole(Roles.MANAGER), updateTeacher);

export default router;
