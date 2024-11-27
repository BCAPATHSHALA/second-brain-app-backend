import { Router } from "express";
import {
  signup,
  signin,
  signout,
  checkAuth,
} from "../controllers/user.controllers";
import { isAuthenticated } from "../middlewares/auth.middleware";

const router = Router();

router.route("/signup").post(signup); // API 1: http://localhost:3000/api/v1/user/signup
router.route("/signin").post(signin); // API 2: http://localhost:3000/api/v1/user/signin
router.route("/signout").get(isAuthenticated as any, signout); // API 3: http://localhost:3000/api/v1/user/signout
router.route("/check").get(isAuthenticated as any, checkAuth); // API 4: http://localhost:3000/api/v1/user/check
export default router;
