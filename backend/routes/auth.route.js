import { Router } from "express";
import {login} from "../controller/auth.controller.js";
import { validate } from "../middleware/validate.middleware.js";
import { loginSchema } from "../validation/auth.schema.js";

const router = Router();

router.post("/login", validate(loginSchema), login);

export default router;