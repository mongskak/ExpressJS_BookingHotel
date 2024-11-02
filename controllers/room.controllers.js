import Room from "../models/room.model.js";
import Booking from "../models/booking.model.js";

export const getRooms = async (req, res) => {
  try {
    // const rooms = await Room.find({});
    // const count = rooms.length;
    // const isEmpty = count === 0;

    // res.status(200).json({
    //   success: true,
    //   data: rooms,
    //   count: count,
    //   isEmpty: isEmpty,
    // });
    const page = parseInt(req.query.page) || 1; // Halaman yang diminta
    const limit = parseInt(req.query.limit) || 10; // Batas jumlah per halaman
    const skip = (page - 1) * limit; // Hitung berapa banyak data yang harus dilewati

    const totalRooms = await Room.countDocuments(); // Hitung total kamar
    const rooms = await Room.find().skip(skip).limit(limit); // Ambil data dengan pagination

    res.json({
      success: true,
      data: rooms,
      totalPages: Math.ceil(totalRooms / limit), // Total halaman
      currentPage: page, // Halaman saat ini
    });
  } catch (error) {
    res.status(500).json({ msg: "server error" });
  }
};

export const createRoom = async (req, res) => {
  const room = req.body;

  if (
    !room.roomNumber ||
    !room.adultCapacity ||
    !room.childrenCapacity ||
    !room.price
  ) {
    return res.status(400).json({ msg: "Please enter all required fields" });
  }

  const newRoom = new Room(room);

  try {
    await newRoom.save();
    res.status(201).json({ msg: "successfully created", data: newRoom });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const updateRoom = async (req, res) => {
  const { id } = req.params;
  const room = req.body;

  if (!id) {
    return res.status(400).json({ msg: "Invalid ID" });
  }

  try {
    const updatedRoom = await Room.findByIdAndUpdate(id, room, { new: true });
    res
      .status(200)
      .json({ msg: "Room updated successfully", data: updatedRoom });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const deleteRoom = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ msg: "Invalid ID" });
  }

  try {
    await Room.findByIdAndDelete(id);
    res.status(200).json({ msg: "Room deleted successfully" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getRoomById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const room = await Room.findById(id);
    if (!room) {
      const error = new Error();
      error.status = 404;
      return next(error);
    }
    res.status(200).json({
      success: true,
      message: "room retrieved successfully",
      data: room,
    });
  } catch (error) {
    error.status = 500;
    next(error);
  }
};

export const getAvailableRoomNumber = async (req, res) => {
  const { NumberOfAdults, NumberOfChildren, CheckInDate, CheckOutDate } =
    req.body;

  try {
    const checkIn = new Date(CheckInDate);
    const checkOut = new Date(CheckOutDate);

    if (isNaN(checkIn) || isNaN(checkOut)) {
      return res
        .status(400)
        .json({ error: "Invalid date format for CheckInDate or CheckOutDate" });
    }

    const availableRoom = await Room.findOne({
      adultCapacity: { $gte: Number(NumberOfAdults) },
      $expr: {
        $gte: [
          { $add: ["$adultCapacity", "$childrenCapacity"] },
          Number(NumberOfAdults) + Number(NumberOfChildren),
        ],
      },
      $nor: [
        {
          _id: {
            $in: await Booking.find({
              roomId: { $exists: true },
              status: { $ne: "Canceled" },
              $or: [
                {
                  checkInDate: { $lte: checkOut },
                  checkOutDate: { $gte: checkIn },
                },
              ],
            }).distinct("roomId"),
          },
        },
      ],
    }).sort({ price: 1 }); // Ambil kamar dengan harga terendah

    if (availableRoom) {
      res.json(availableRoom);
    } else {
      res.status(404).json({ message: "No available room found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
