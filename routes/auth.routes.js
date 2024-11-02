import express from "express";
import {
  Login,
  Logout,
  Register,
  Token,
} from "../controllers/auth.controller.js";

const router = express.Router();
// Middleware autentikasi

router.post("/login", Login);
router.delete("/logout", Logout);
router.post("/register", Register);
router.get("/token", Token);

export default router;
