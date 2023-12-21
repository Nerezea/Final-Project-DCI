import { Router } from "express";
import {
  createMessage,
  getMessages,
  deleteMessage,
} from "../controller/pv.controller.js";
import { auth } from "../middleware/auth.js";
import { hasRole } from "../middleware/role.js";
import { Roles } from "../models/user.model.js";

const router = Router();

router.get(
  "/getMessages/:receiverId",
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

router.delete(
  "/deleteMessage/:messageId",
  auth,
  hasRole(Roles.MANAGER, Roles.PARENT, Roles.TEACHER),
  deleteMessage
);

export default router;
