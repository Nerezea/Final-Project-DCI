import { Router } from "express";
import {
  createFeed,
  deleteFeed,
  getFeeds,
  updateFeed,
  getFeedById
} from "../controller/feed.controller.js";
import { auth } from "../middleware/auth.js";
import { hasRole } from "../middleware/role.js";
import { validate } from "../middleware/validate.middleware.js";
import { Roles } from "../models/user.model.js";
import { createFeedSchema } from "../validation/feed.schema.js";

const router = Router();

router.get("/", auth, hasRole(Roles.MANAGER,Roles.TEACHER,Roles.PARENT), getFeeds);
router.get("/:feedId", auth, hasRole(Roles.MANAGER,Roles.TEACHER,Roles.PARENT), getFeedById);
router.post(
  "/",
  auth,
  hasRole(Roles.MANAGER,Roles.TEACHER),
  validate(createFeedSchema),
  createFeed
);
router.delete("/:feedId", auth, hasRole(Roles.MANAGER,Roles.TEACHER), deleteFeed);
router.put("/:feedId", auth, hasRole(Roles.MANAGER,Roles.TEACHER), updateFeed);

export default router;
