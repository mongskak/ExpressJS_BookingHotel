import express from "express";
import {
  getUserProfile,
  Login,
  Register,
} from "../controllers/users.controller.js";
import { readToken } from "../middleware/auth.middleware.js";

const router = express.Router();
// Middleware autentikasi

router.post("/login", Login);
router.post("/register", Register);
router.get("/:id", readToken, getUserProfile);

export default router;
