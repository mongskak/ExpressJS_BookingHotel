import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    guestLastName: {
      type: String,
      required: true,
      unique: true,
    },
    guestFirstName: {
      type: String,
      required: true,
    },
    checkInDate: {
      type: Date,
      required: true,
    },
    checkOutDate: {
      type: Date,
      required: true,
    },
    numberOfAdults: {
      type: Number,
      required: true,
    },
    numberOfChildren: {
      type: Number,
      required: true,
    },
    roomId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room",
      required: true,
    },
    status: {
      type: String,
      enum: ["Booked", "CheckedIn", "CheckedOut", "Canceled"],
      default: "Booked",
    },
  },
  {
    timestamps: true,
  }
);

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;
