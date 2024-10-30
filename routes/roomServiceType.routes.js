import express from "express";
import {
  createRoomServiceType,
  getRoomServiceTypes,
} from "../controllers/roomServiceType.cotroller.js";
import { readToken } from "../middleware/auth.middleware.js";

const router = express.Router();

router.use(readToken);
router.get("/", getRoomServiceTypes);
router.post("/", createRoomServiceType);

export default router;
