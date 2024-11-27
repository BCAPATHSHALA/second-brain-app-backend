import { Router } from "express";
import { isAuthenticated } from "../middlewares/auth.middleware";
import {
  createSharedLink,
  getAllSharedLinks,
  getSharedLink,
} from "../controllers/brain.controllers";

const router = Router();

router.route("/share").post(isAuthenticated as any, createSharedLink); // API 1: http://localhost:3000/api/v1/brain/share
router.route("/:sharedHash").get(getSharedLink); // API 2: http://localhost:3000/api/v1/brain/:sharedHash
router.route("/all-shared-links/1").get(getAllSharedLinks); // API 3: http://localhost:3000/api/v1/brain/all-shared-links

export default router;
