import express from "express";
import {
  createBooking,
  getBookingDetail,
  getBookings,
  updateStatusBooking,
} from "../controllers/booking.controller.js";
import { readToken } from "../middleware/auth.middleware.js";

const router = express.Router();

router.use(readToken);
router.post("/", createBooking);
router.get("/", getBookings);
router.get("/:id", getBookingDetail);
router.put("/:id", updateStatusBooking);

export default router;
