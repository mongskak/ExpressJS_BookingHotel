import express from "express";
import {
  createAmenity,
  deleteAmenity,
  getAmenities,
} from "../controllers/amenity.controllers.js";
import { readToken } from "../middleware/auth.middleware.js";

const router = express.Router();

router.use(readToken);
router.get("/", getAmenities);
router.post("/", createAmenity);
router.delete("/:id", deleteAmenity);

export default router;
