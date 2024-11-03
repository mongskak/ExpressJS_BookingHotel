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

  if (req.query.Bookingid) {
    query.bookingid = req.query.bookingid;
  }

  try {
    const roomService = await RoomService.find(query).populate(Bookingid);
    if (!roomService) {
      return res.status(404).json({
        message: "Room service not found",
      });
    }
    res.json({
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
