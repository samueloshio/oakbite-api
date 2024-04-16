import Restaurant from '../models/RestaurantModel.js';

export const addRestaurant = async (req, res, next) => {
  const { title, time, imageUrl, owner, code, logoUrl, coordinates } = req.body;
  if (
    !title ||
    !time ||
    !imageUrl ||
    !owner ||
    !code ||
    !logoUrl ||
    !coordinates ||
    !coordinates.latitude ||
    !coordinates.longitude ||
    !coordinates.address ||
    !coordinates.title
  ) {
    return res
      .status(401)
      .json({ status: false, message: 'You have a missing field' });
  }
  try {
    const newRestaurant = new Restaurant(req.body);
    await newRestaurant.save();
    res.status(201).json({
      status: true,
      Messagee: `A new restaurant ${newRestaurant.title} is created Successfully`,
    });
  } catch (err) {
    next(err);
  }
};

export const getRestaurantById = async (req, res, next) => {
  const id = req.params.id;
  try {
    const restaurant = await Restaurant.findById(id);
    res.status(201).json(restaurant);
  } catch (err) {
    next(err);
  }
};

export const getRandomRestaurant = async (req, res, next) => {
  const code = req.params.code;
  try {
    let randomRestaurant = [];
    if (code) {
      randomRestaurant = await Restaurant.aggregate([
        { $match: { code: code, isAvailable: true } },
        { $sample: { size: 5 } },
        { $project: { __v: 0 } },
      ]);
    }
    if (randomRestaurant.length === 0) {
      randomRestaurant = await Restaurant.aggregate([
        { $match: { isAvailable: true } },
        { $sample: { size: 5 } },
        { $project: { __v: 0 } },
      ]);
    }
    res.status(201).json(randomRestaurant);
  } catch (err) {
    next(err);
  }
};

export const getAllNearbyRestaurant = async (req, res, next) => {
  const code = req.params.code;
  try {
    let allNearByRestaurants = [];
    if (code) {
      allNearByRestaurants = await Restaurant.aggregate([
        { $match: { code: code, isAvailable: true } },
        { $project: { __v: 0 } },
      ]);
    }
    if (allNearByRestaurants.length === 0) {
      allNearByRestaurants = await Restaurant.aggregate([
        { $match: { isAvailable: true } },
        { $project: { __v: 0 } },
      ]);
    }
    res.status(201).json(allNearByRestaurants);
  } catch (err) {
    next(err);
  }
};
