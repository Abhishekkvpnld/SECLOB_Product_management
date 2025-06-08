import express from "express";
import {
  login,
  signUp,
  userDetails,
  userLogout,
} from "../controllers/user/auth.js";
import { authToken } from "../middleware/jwtAuth.js";

const router = express.Router();

router.post("/signup", signUp);
router.post("/login", login);
router.get("/me", authToken, userDetails);
router.get("/logout", authToken, userLogout);

export default router;
