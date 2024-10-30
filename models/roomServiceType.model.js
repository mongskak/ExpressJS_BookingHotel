import mongoose from "mongoose";

const serviceRoomTypeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

const ServiceRoomType = mongoose.model(
  "ServiceRoomType",
  serviceRoomTypeSchema
);

export default ServiceRoomType;
