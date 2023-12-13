
import { Router } from "express";
import { createEvent, deleteEvent, getEvents, updateEvent } from "../controller/event.controller.js";
import { auth } from "../middleware/auth.js";
import { hasRole } from "../middleware/role.js";
import { validate } from "../middleware/validate.middleware.js";
import { Roles } from "../models/user.model.js";
import { createEventSchema } from "../validation/event.schema.js";

const router = Router();



router.get("/", auth, hasRole(Roles.MANAGER), getEvents);
router.post("/", auth, hasRole(Roles.MANAGER), validate(createEventSchema), createEvent);
router.delete("/:id", auth, hasRole(Roles.MANAGER), deleteEvent);
router.put("/:id", auth, hasRole(Roles.MANAGER), updateEvent);

export default router;

