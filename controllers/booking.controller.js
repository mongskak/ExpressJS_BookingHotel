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
  try {
    const bookings = await Booking.find().populate("roomId");

    res.status(200).json({ msg: "success", data: bookings });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "server error" });
  }
};

export const getBookingDetail = async (req, res) => {
  const { id } = req.params;
  try {
    const booking = await Booking.findById(id).populate("roomId");
    if (!booking) {
      return res.status(404).json({ msg: "Booking not found" });
    }
    res.status(200).json({ msg: "success", data: booking });
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
