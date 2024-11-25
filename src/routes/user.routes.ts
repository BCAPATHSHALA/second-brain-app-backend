import { Router } from "express";
import { signup, signin, logout } from "../controllers/user.controllers";
import { isAuthenticated } from "../middlewares/auth.middleware";

const router = Router();

router.route("/signup").post(signup); // API 1: http://localhost:3000/api/v1/user/signup
router.route("/signin").post(signin); // API 2: http://localhost:3000/api/v1/user/signin
router.route("/logout").post(isAuthenticated as any, logout); // API 3: http://localhost:3000/api/v1/user/logout

export default router;
