import mongoose from "mongoose";

const statusSchema = new mongoose.Schema({
  statusName: {
    type: String,
    enum: ["booked", "checkedIn", "checkedOut", "canceled"],
    required: true,
  },
});

const Status = mongoose.model("Status", statusSchema);
export default Status;
