import express from "express";
import {
  createAmenity,
  deleteAmenity,
  getAmenities,
} from "../controllers/amenity.controllers.js";
import { readAccessToken } from "../middleware/auth.middleware.js";

const router = express.Router();

router.use(readAccessToken);
router.get("/", getAmenities);
router.post("/", createAmenity);
router.delete("/:id", deleteAmenity);

export default router;
