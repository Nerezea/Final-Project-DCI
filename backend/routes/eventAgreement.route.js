import { Router } from "express";
import { auth } from "../middleware/auth.js";
import { hasRole } from "../middleware/role.js";
import { Roles } from "../models/user.model.js";
import {
  ImAgree,
  ImNotAgree,
  getAgreementStatus,
  getAgreements
} from "../controller/eventAgreement.controller.js";


const router = Router();
router.get("/admin/:eventId", auth, hasRole(Roles.MANAGER,Roles.TEACHER), getAgreements);
router.get("/:eventId", auth, hasRole(Roles.PARENT), getAgreementStatus);

// I'm Agree
router.post("/:eventId", auth, hasRole(Roles.PARENT), ImAgree);
// I'm not Agree
router.delete("/:eventId", auth, hasRole(Roles.PARENT), ImNotAgree);

export default router;
