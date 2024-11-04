import express from "express";
import {
  createRoomAmenity,
  deleteRoomAmenity,
  getRoomAmenitieByRoomId,
  getRoomAmenities,
} from "../controllers/roomAmenity.controller.js";
import { readAccessToken } from "../middleware/auth.middleware.js";

const router = express.Router();

router.use(readAccessToken);
router.get("/", readAccessToken, getRoomAmenities);
router.post("/", readAccessToken, createRoomAmenity);
router.delete("/:id", readAccessToken, deleteRoomAmenity);
router.get("/:roomId", readAccessToken, getRoomAmenitieByRoomId);

export default router;
