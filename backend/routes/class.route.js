import { Router } from "express";
import {
  createClass,
  deleteClass,
  getClassById,
  getClassList,
  updateClass,
} from "../controller/class.controller.js";
import { auth } from "../middleware/auth.js";
import { hasRole } from "../middleware/role.js";
import { validate } from "../middleware/validate.middleware.js";
import { Roles } from "../models/user.model.js";
import { createClassSchema } from "../validation/class.schema.js";

const router = Router();

router.get("/", auth, hasRole(Roles.MANAGER), getClassList);
router.get("/:classId", auth, hasRole(Roles.MANAGER), getClassById);
router.post(
  "/",
  auth,
  hasRole(Roles.MANAGER),
  validate(createClassSchema),
  createClass
);
router.delete("/:classId", auth, hasRole(Roles.MANAGER), deleteClass);
router.put("/:classId", auth, hasRole(Roles.MANAGER), updateClass);

export default router;
