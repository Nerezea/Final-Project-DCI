import { Router } from "express";
import {
  activate,
  createStudent,
  deleteStudent,
  getStudentById,
  getStudents,
  updateStudent,
} from "../controller/student.controller.js";
import { auth } from "../middleware/auth.js";
import { hasRole } from "../middleware/role.js";
import { validate } from "../middleware/validate.middleware.js";
import { Roles } from "../models/user.model.js";
import {
  createStudentByManagerSchema,
  updateStudentByManagerSchema,
} from "../validation/student.schema.js";

const router = Router();

router.get("/", auth, hasRole(Roles.MANAGER,Roles.TEACHER), getStudents);
router.get("/:id", auth, hasRole(Roles.MANAGER,Roles.TEACHER), getStudentById);
router.post(
  "/",
  auth,
  hasRole(Roles.MANAGER),
  validate(createStudentByManagerSchema),
  createStudent
);
router.delete("/:studentId", auth, hasRole(Roles.MANAGER), deleteStudent);
router.put(
  "/:studentId",
  auth,
  hasRole(Roles.MANAGER),
  validate(updateStudentByManagerSchema),
  updateStudent
);
router.put("/activate/:studentId", auth, hasRole(Roles.MANAGER), activate);

export default router;
