import { Router } from "express";
import {
  createEvent,
  deleteEvent,
  getEvents,
  updateEvent,
  getEventById
} from "../controller/event.controller.js";
import { auth } from "../middleware/auth.js";
import { hasRole } from "../middleware/role.js";
import { validate } from "../middleware/validate.middleware.js";
import { Roles } from "../models/user.model.js";
import { createEventSchema } from "../validation/event.schema.js";

const router = Router();

router.get("/", auth, hasRole(Roles.MANAGER, Roles.TEACHER,Roles.PARENT), getEvents);
router.get("/:eventId", auth, hasRole(Roles.MANAGER, Roles.TEACHER,Roles.PARENT), getEventById);
router.post(
  "/",
  auth,
  hasRole(Roles.MANAGER, Roles.TEACHER),
  validate(createEventSchema),
  createEvent
);
router.delete(
  "/:eventId",
  auth,
  hasRole(Roles.MANAGER, Roles.TEACHER),
  deleteEvent
);
router.put(
  "/:eventId",
  auth,
  hasRole(Roles.MANAGER, Roles.TEACHER),
  updateEvent
);

export default router;
