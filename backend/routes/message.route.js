import { Router } from "express";
import {
  createMessage,
  getMessages,
} from "../controller/message.controller.js";
import { auth } from "../middleware/auth.js";
import { hasRole } from "../middleware/role.js";
import { Roles } from "../models/user.model.js";

const router = Router();

router.get(
  "/getForumMessages",
  auth,
  hasRole(Roles.MANAGER, Roles.PARENT, Roles.TEACHER),
  getMessages
);

router.post(
  "/sendMessage",
  auth,
  hasRole(Roles.MANAGER, Roles.PARENT, Roles.TEACHER),
  createMessage
);

export default router;
