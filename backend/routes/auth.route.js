import { Router } from "express";
import {
  login,
  register,
  getUserDetail,
  editProfile,
  getProfile,
  changePassword
} from "../controller/auth.controller.js";
import { validate } from "../middleware/validate.middleware.js";
import { changePasswordSchema, editProfileSchema, loginSchema, registerSchema } from "../validation/auth.schema.js";
import { auth } from "../middleware/auth.js";
import { hasRole } from "../middleware/role.js";
import { Roles } from "../models/user.model.js";

const router = Router();

router.post("/login", validate(loginSchema), login);
router.post("/studentRegister", validate(registerSchema), register);
router.post("/getUserDetail/:id", auth, getUserDetail);
router.put("/editProfile", auth,hasRole(Roles.MANAGER,Roles.PARENT,Roles.TEACHER),validate(editProfileSchema), editProfile);
router.get("/profile", auth,hasRole(Roles.MANAGER,Roles.PARENT,Roles.TEACHER), getProfile);
router.put("/changePassword", auth,hasRole(Roles.MANAGER,Roles.PARENT,Roles.TEACHER),validate(changePasswordSchema), changePassword);

export default router;
