import { Router } from "express";
import {
  login,
  register,
  getUserDetail,
} from "../controller/auth.controller.js";
import { validate } from "../middleware/validate.middleware.js";
import { loginSchema, registerSchema } from "../validation/auth.schema.js";
import { auth } from "../middleware/auth.js";

const router = Router();

router.post("/login", validate(loginSchema), login);
router.post("/studentRegister", validate(registerSchema), register);
router.post("/getUserDetail/:id", auth, getUserDetail);

export default router;
