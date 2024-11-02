import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import RoomRoute from "./routes/room.routes.js";
import BookingRoute from "./routes/booking.routes.js";
import AuthRoute from "./routes/auth.routes.js";
import UserRoute from "./routes/user.routes.js";
import AmenityRoute from "./routes/amenity.routes.js";
import RoomAmenityRoute from "./routes/roomAmenity.routes.js";
import RoomServiceTypeRoute from "./routes/roomServiceType.routes.js";
import { errorMiddleware } from "./middleware/errorHandler.middleware.js";
import cookieParser from "cookie-parser";

dotenv.config();

// Create Express App instance
const app = express();

// Enable CORS (Cross-Origin Resource Sharing) for development purposes
app.use(
  cors({
    credentials: true,
<<<<<<< HEAD
    origin: process.env.CORS_ORIGIN,
=======
    origin: "http://localhost:5000",
>>>>>>> 84f53c625b44cb81ebff7a28ba673c0f550ea0b9
  })
);

// Cookie Parser for Requests
app.use(cookieParser());

// Middleware to parse JSON request bodies
app.use(express.json());

// Define routes
app.use("/api/v1/auth", AuthRoute);
app.use("/api/v1/users", UserRoute);
app.use("/api/v1/rooms", RoomRoute);
app.use("/api/v1/bookings", BookingRoute);
app.use("/api/v1/amenities", AmenityRoute);
app.use("/api/v1/roomAmenity", RoomAmenityRoute);
app.use("/api/v1/roomServiceType", RoomServiceTypeRoute);

// error handling
app.use(errorMiddleware);

export default app;
