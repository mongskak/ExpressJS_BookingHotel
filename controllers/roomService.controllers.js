import RoomService from "../models/roomService.model.js";

export const createRoomService = async (req, res, next) => {
  try {
    const roomService = new RoomService(req.body);
    await roomService.save();
    res.status(201).json({
      message: "Room service added successfully",
      data: roomService,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error adding room service",
      error: error.message,
    });
  }
};

export const getRoomService = async (req, res) => {
  const query = {};

  if (req.query.bookingid) {
    query.bookingId = req.query.bookingid;
  }
  try {
    const roomService = await RoomService.find(query)
      .populate("roomServiceTypeId")
      .populate("bookingId");
    res.status(200).json({
      message: "Room service found",
      data: roomService,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error finding room service",
      error: error.message,
    });
  }
};
