import express from "express";
import { occupancyrate } from "../controllers/booking.controller.js";
import { readAccessToken } from "../middleware/auth.middleware.js";

const router = express.Router();

router.use(readAccessToken);
router.get("/", readAccessToken, occupancyrate);

export default router;
