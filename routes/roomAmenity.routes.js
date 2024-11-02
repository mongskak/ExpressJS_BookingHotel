import express from "express";
import {
  createRoomAmenity,
  getRoomAmenitieByRoomId,
  getRoomAmenities,
} from "../controllers/roomAmenity.controller.js";
import { readAccessToken } from "../middleware/auth.middleware.js";

const router = express.Router();

router.use(readAccessToken);
router.get("/", getRoomAmenities);
router.post("/", createRoomAmenity);
router.get("/:roomId", getRoomAmenitieByRoomId);

export default router;
