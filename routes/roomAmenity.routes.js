import express from "express";
import {
  createRoomAmenity,
  getRoomAmenitieByRoomId,
  getRoomAmenities,
} from "../controllers/roomAmenity.controller.js";
import { readAccessToken } from "../middleware/auth.middleware.js";

const router = express.Router();

router.use(readAccessToken);
router.get("/", readAccessToken, getRoomAmenities);
router.post("/", readAccessToken, createRoomAmenity);
router.get("/:roomId", readAccessToken, getRoomAmenitieByRoomId);

export default router;
