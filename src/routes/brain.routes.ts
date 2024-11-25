import { Router } from "express";
import { isAuthenticated } from "../middlewares/auth.middleware";
import {
  createSharedLink,
  getSharedLink,
} from "../controllers/brain.controllers";

const router = Router();

router.route("/share").post(isAuthenticated as any, createSharedLink); // API 1: http://localhost:3000/api/v1/brain/share
router.route("/:sharedHash").get(getSharedLink); // API 2: http://localhost:3000/api/v1/brain/:sharedHash

export default router;
