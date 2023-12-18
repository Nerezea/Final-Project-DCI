import { Router } from "express";
import {
  createTeacher,
  deleteTeacher,
<<<<<<< HEAD
  getTeacherById,
=======
>>>>>>> dev
  getTeachers,
  updateTeacher,
} from "../controller/teacher.controller.js";
import { auth } from "../middleware/auth.js";
import { hasRole } from "../middleware/role.js";
import { Roles } from "../models/user.model.js";
import { validate } from "../middleware/validate.middleware.js";
import { createTeacherSchema, updateTeacherSchema } from "../validation/teacher.schema.js";

const router = Router();

router.get("/", auth, hasRole(Roles.MANAGER), getTeachers);
<<<<<<< HEAD
router.get("/:teacherId", auth, hasRole(Roles.MANAGER), getTeacherById);
=======
>>>>>>> dev
router.post(
  "/",
  auth,
  hasRole(Roles.MANAGER),
  validate(createTeacherSchema),
  createTeacher
);
router.delete("/:teacherId", auth, hasRole(Roles.MANAGER), deleteTeacher);
<<<<<<< HEAD

router.put(
  "/:teacherId",
  auth,
  hasRole(Roles.MANAGER),
  validate(updateTeacherSchema),
  updateTeacher
);
=======
router.put("/:teacherId", auth, hasRole(Roles.MANAGER), updateTeacher);
>>>>>>> dev

export default router;
