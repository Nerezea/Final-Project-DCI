import { Router } from "express";
import {
  createSickRest,
  deleteSickRest,
  getSickRests,
} from "../controller/sick.controller.js";
import { auth } from "../middleware/auth.js";
import { hasRole } from "../middleware/role.js";
import { validate } from "../middleware/validate.middleware.js";
import { Roles } from "../models/user.model.js";
import { createSickRestSchema } from "../validation/sick.schema.js";

const router = Router();


router.get("/", auth, hasRole(Roles.MANAGER, Roles.PARENT), getSickRests);
router.post(
  "/",
  auth,
  hasRole(Roles.PARENT),
  validate(createSickRestSchema),
  createSickRest
);
router.delete("/:id", auth, hasRole(Roles.PARENT), deleteSickRest);

export default router;
