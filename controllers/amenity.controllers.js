import Amenity from "../models/amenity.model.js";

export const getAmenities = async (req, res) => {
  try {
    const amenities = await Amenity.find({});
    res.status(200).json({
      success: true,
      data: amenities,
    });
  } catch (error) {
    next(error);
  }
};

export const createAmenity = async (req, res) => {
  const amenity = req.body;
  try {
    const newAmenity = new Amenity(amenity);
    await newAmenity.save();
    res.status(201).json({
      success: true,
      message: "data created successfully",
      data: newAmenity,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteAmenity = async (req, res) => {
  const { id } = req.params;
  try {
    await Amenity.findByIdAndDelete(id);
    res
      .status(200)
      .json({ success: true, message: "data deleted successfully" });
  } catch (error) {
    next(error);
  }
};
