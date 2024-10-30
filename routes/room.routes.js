import express from "express";
import {
  createRoom,
  deleteRoom,
  getAvailableRoomNumber,
  getRoomById,
  getRooms,
  updateRoom,
} from "../controllers/room.controllers.js";
import { readToken } from "../middleware/auth.middleware.js";

const router = express.Router();

router.use(readToken);

router.get("/", getRooms);
router.post("/", createRoom);
router.put("/:id", updateRoom);
router.delete("/:id", deleteRoom);
router.get("/:id", getRoomById);
router.post("/availableRoom", getAvailableRoomNumber);

export default router;
