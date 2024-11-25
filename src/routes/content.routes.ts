import { Router } from "express";
import { isAuthenticated } from "../middlewares/auth.middleware";
import { createContent, getContent, deleteContent, updateContent } from "../controllers/content.controllers";

const router = Router();

router.route("/create").post(isAuthenticated as any, createContent); // API 1: http://localhost:3000/api/v1/content/create
router.route("/get").get(isAuthenticated as any, getContent); // API 2: http://localhost:3000/api/v1/content/get
router.route("/delete").delete(isAuthenticated as any, deleteContent); // API 3: http://localhost:3000/api/v1/content/delete
router.route("/update").put(isAuthenticated as any, updateContent); // API 4: http://localhost:3000/api/v1/content/update

export default router;