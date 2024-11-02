import express from "express";
import {
  createRoom,
  deleteRoom,
  getAvailableRoomNumber,
  getRoomById,
  getRooms,
  updateRoom,
} from "../controllers/room.controllers.js";
import { readAccessToken } from "../middleware/auth.middleware.js";

const router = express.Router();

// router.use(readAccessToken);

router.get("/", readAccessToken, getRooms);
router.post("/", readAccessToken, createRoom);
router.put("/:id", readAccessToken, updateRoom);
router.delete("/:id", readAccessToken, deleteRoom);
router.get("/:id", readAccessToken, getRoomById);
router.post("/availableRoom", readAccessToken, getAvailableRoomNumber);

export default router;
