import ServiceRoomType from "../models/roomServiceType.model.js";

export const getRoomServiceTypes = async (req, res) => {
  try {
    const roomServiceTypes = await ServiceRoomType.find();
    res.status(200).json({ success: true, data: roomServiceTypes });
  } catch (error) {
    res.status(500).json({ success: false, msg: "server error" });
  }
};

export const createRoomServiceType = async (req, res) => {
  const roomServiceType = new ServiceRoomType(req.body);
  try {
    await roomServiceType.save();
    res.status(201).json({ success: true, data: roomServiceType });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};
