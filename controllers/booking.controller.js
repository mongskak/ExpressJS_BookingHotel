import Room from "../models/room.model.js";
import Booking from "../models/booking.model.js";

export const createBooking = async (req, res, next) => {
  const bookingRecord = req.body;
  try {
    // Cari Room berdasarkan roomNumber
    const room = await Room.findOne({
      roomNumber: bookingRecord.roomNumber,
    });
    if (!room) {
      const error = new Error("Room not found");
      error.status = 404;
      return next(error);
    }

    // Buat booking baru
    const booking = new Booking({
      guestLastName: bookingRecord.guestLastName,
      guestFirstName: bookingRecord.guestFirstName,
      checkInDate: bookingRecord.checkInDate,
      checkOutDate: bookingRecord.checkOutDate,
      numberOfAdults: bookingRecord.numberOfAdults,
      numberOfChildren: bookingRecord.numberOfChildren,
      roomId: room._id,
      status: bookingRecord.status,
    });

    // Simpan booking ke database
    await booking.save();
    res
      .status(201)
      .json({ success: true, msg: "Booking berhasil dibuat:", data: booking });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

export const getBookings = async (req, res) => {
  const page = parseInt(req.query.page) || 1; // Halaman yang diminta
  const limit = parseInt(req.query.limit) || 10; // Batas jumlah per halaman
  const skip = (page - 1) * limit; // Hitung berapa banyak data yang harus dilewati

  const query = {};
  if (req.query.status) {
    query.status = req.query.status;
  }
  if (req.query.checkInDate) {
    query.checkInDate = new Date(req.query.checkInDate);
  }
  if (req.query.checkOutDate) {
    query.checkOutDate = new Date(req.query.checkOutDate);
  }
  if (req.query.guestLastName) {
    query.guestLastName = req.query.guestLastName;
  }
  if (req.query.roomId) {
    query.roomId = req.query.roomId;
  }

  try {
    const count = await Booking.countDocuments(query);
    const bookings = await Booking.find(query)
      .populate("roomId")
      .skip(skip)
      .limit(limit);

    res.status(200).json({ success: true, data: bookings, count: count });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "server error" });
  }
};

export const getBookingDetail = async (req, res) => {
  const { id } = req.params;
  try {
    const booking = await Booking.findById(id).populate("roomId");
    const bookingDetail = {
      guestLastName: booking.guestLastName,
      guestFirstName: booking.guestFirstName,
      checkInDate: booking.checkInDate,
      checkOutDate: booking.checkOutDate,
      numberOfAdults: booking.numberOfAdults,
      numberOfChildren: booking.numberOfChildren,
      roomNumber: booking.roomId.roomNumber,
      roomPrice: booking.roomId.price,
      status: booking.status,
    };
    if (!bookingDetail) {
      return res.status(404).json({ msg: "Booking not found" });
    }
    res.status(200).json({ msg: "success", data: bookingDetail });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "server error" });
  }
};

export const getBookingByStatusAndDate = async (req, res) => {
  const { status } = req.query;
  const { Date } = req.query;
  try {
    const bookings = await Booking.find({
      status: status,
      $or: [{ checkInDate: Date }, { checkOutDate: Date }],
    });
    if (!bookings) {
      return res
        .status(404)
        .json({ msg: "No bookings found with this status" });
    }
    res.status(200).json({ msg: "success", data: bookings });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "server error" });
  }
};

export const updateStatusBooking = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const booking = await Booking.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    if (!booking) {
      return res.status(404).json({ msg: "Booking not found" });
    }
    res
      .status(200)
      .json({ msg: "Booking status updated successfully", data: booking });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "server error" });
  }
};

export const occupancyrate = async (req, res) => {
  try {
    const totalRooms = await Room.countDocuments();
    const today = new Date();
    const occupancyRates = [];

    // Loop untuk setiap hari selama 7 hari ke depan
    for (let i = 0; i < 7; i++) {
      const currentDate = new Date();
      currentDate.setDate(today.getDate() + i);

      // Hitung jumlah booking untuk hari ini
      const bookingsToday = await Booking.find({
        checkInDate: { $lte: currentDate },
        checkOutDate: { $gt: currentDate },
      });

      // Hitung total kamar yang terisi
      const occupiedRooms = new Set(
        bookingsToday.map((booking) => booking.roomId.toString())
      ).size;

      // Hitung occupancy rate
      const occupancyRate =
        totalRooms > 0 ? (occupiedRooms / totalRooms) * 100 : 0;

      occupancyRates.push({
        date: currentDate.toISOString().split("T")[0], // Format YYYY-MM-DD
        totalRooms,
        occupiedRooms,
        occupancyRate,
      });
    }

    res.status(200).json(occupancyRates);
  } catch (error) {
    res.status(500).send(error);
  }
};
