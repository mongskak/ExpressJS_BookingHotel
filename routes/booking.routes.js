import express from "express";
import {
  createBooking,
  getBookingByStatusAndDate,
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
router.get("/filter", readAccessToken, getBookingByStatusAndDate);
router.put("/:id", readAccessToken, updateStatusBooking);

export default router;
