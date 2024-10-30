import RoomAmenity from "../models/roomAmenity.model.js";

export const getRoomAmenities = async (req, res) => {
  try {
    const roomAmenities = await RoomAmenity.find()
      .populate("roomId")
      .populate("amenityId");
    res.status(200).json({ msg: "success", data: roomAmenities });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createRoomAmenity = async (req, res) => {
  const roomAmenity = new RoomAmenity(req.body);
  try {
    await roomAmenity.save();
    res.status(201).json({ msg: "success", data: roomAmenity });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const deleteRoomAmenity = async (req, res) => {
  const { id } = req.params;
  try {
    const roomAmenity = await RoomAmenity.findByIdAndDelete(id);
    if (!roomAmenity)
      return res.status(404).json({ msg: "Room amenity not found" });
    res.status(200).json({ msg: "success", data: roomAmenity });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getRoomAmenitieByRoomId = async (req, res) => {
  const { roomId } = req.params;
  try {
    const roomAmenities = await RoomAmenity.find({ roomId: roomId }).populate(
      "amenityId"
    );
    res.status(200).json({ msg: "success", data: roomAmenities });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
