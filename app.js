import express from "express";
import dotenv from "dotenv";
import RoomRoute from "./routes/room.routes.js";
import BookingRoute from "./routes/booking.routes.js";
import UserRoute from "./routes/user.routes.js";
import AmenityRoute from "./routes/amenity.routes.js";
import RoomAmenityRoute from "./routes/roomAmenity.routes.js";
import RoomServiceTypeRoute from "./routes/roomServiceType.routes.js";
import { errorMiddleware } from "./middleware/errorHandler.middleware.js";

// Create Express App instance
const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());
dotenv.config();

// Define routes
app.use("/api/v1/rooms", RoomRoute);
app.use("/api/v1/bookings", BookingRoute);
app.use("/api/v1/users", UserRoute);
app.use("/api/v1/amenities", AmenityRoute);
app.use("/api/v1/roomAmenity", RoomAmenityRoute);
app.use("/api/v1/roomServiceType", RoomServiceTypeRoute);

// error handling
app.use(errorMiddleware);

export default app;
