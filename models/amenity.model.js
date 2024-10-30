import mongoose from "mongoose";

const amenitySchema = new mongoose.Schema(
  {
    amenityName: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

const Amenity = mongoose.model("Amenity", amenitySchema);

export default Amenity;
