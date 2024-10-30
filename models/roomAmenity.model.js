import mongoose from "mongoose";

const roomAmenitySchema = new mongoose.Schema({
  roomId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Room",
    requered: true,
  },
  amenityId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Amenity",
    required: true,
  },
});

const RoomAmenity = mongoose.model("RoomAmenity", roomAmenitySchema);

export default RoomAmenity;
