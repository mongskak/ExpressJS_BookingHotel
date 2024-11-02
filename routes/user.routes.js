import express from "express";
import { getProfile, getUserProfile } from "../controllers/user.controller.js";
import { readAccessToken } from "../middleware/auth.middleware.js";

const router = express.Router();
// Middleware autentikasi

router.get("/profile/", readAccessToken, getProfile);
router.get("/:id", readAccessToken, getUserProfile);

export default router;
