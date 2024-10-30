import mongoose from "mongoose";

const roomServiceSchema = new mongoose.Schema(
  {
    bookingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
      required: true,
    },
    roomServiceTypeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "RoomServiceType",
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const RoomService = mongoose.model("RoomService", roomServiceSchema);

export default RoomService;
