import express from "express";
import {
  createRoomService,
  getRoomService,
} from "../controllers/roomService.controllers.js";

const router = express.Router();

router.get("/", getRoomService);
router.post("/", createRoomService);

export default router;
