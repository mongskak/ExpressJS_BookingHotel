import express from "express";
import {
  createBooking,
  getBookingDetail,
  getBookings,
  updateStatusBooking,
} from "../controllers/booking.controller.js";
import { readAccessToken } from "../middleware/auth.middleware.js";

const router = express.Router();

router.use(readAccessToken);
router.post("/", readAccessToken, createBooking);
router.get("/", readAccessToken, getBookings);
router.get("/:id", readAccessToken, getBookingDetail);
router.put("/:id", readAccessToken, updateStatusBooking);

export default router;
