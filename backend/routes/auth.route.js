import { Router } from "express";
import { login, register } from "../controller/auth.controller.js";
import { validate } from "../middleware/validate.middleware.js";
import { loginSchema, registerSchema } from "../validation/auth.schema.js";

const router = Router();

router.post("/login", validate(loginSchema), login);
router.post("/studentRegister", validate(registerSchema), register);

export default router;
