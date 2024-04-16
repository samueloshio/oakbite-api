import Rating from '../models/RatingModel.js';
import Restaurant from '../models/RestaurantModel.js';
import Food from '../models/FoodModel.js';

export const addRating = async (req, res, next) => {
  try {
    const newRating = new Rating({
      userId: req.user.id,
      ratingType: req.body.ratingType,
      ratingTypeId: req.body.ratingTypeId,
      rating: req.body.rating,
    });
    await newRating.save();
    if (req.body.ratingType === 'Rstaurant') {
      const restaurant = await Rating.aggregate([
        {
          $match: {
            ratingType: req.body.ratingType,
            ratingTypeId: req.body.ratingTypeId,
          },
        },
        {
          $groud: { _id: '$ratingTypeId' },
          averageRating: { $avg: '$rating' },
        },
      ]);
      if (restaurant.length > 0) {
        const averageRating = restaurant[0].averageRating;
        await Restaurant.findByIdAndUpdate(
          req.body.ratingTypeId,
          { rating: averageRating },
          { new: true }
        );
      }
    } else if (req.body.ratingType === 'Food') {
      const food = await Rating.aggregate([
        {
          $match: {
            ratingType: req.body.ratingType,
            ratingTypeId: req.body.ratingTypeId,
          },
        },
        {
          $groud: { _id: '$ratingTypeId' },
          averageRating: { $avg: '$rating' },
        },
      ]);
      if (food.length > 0) {
        const averageRating = food[0].averageRating;
        await Food.findByIdAndUpdate(
          req.body.ratingTypeId,
          { rating: averageRating },
          { new: true }
        );
      }
    }
    // else if (req.body.ratingType === 'Driver') {
    //   const driver = await Rating.aggregate([
    //     {
    //       $match: {
    //         ratingType: req.body.ratingType,
    //         ratingTypeId: req.body.ratingTypeId,
    //       },
    //     },
    //     {
    //       $groud: { _id: '$ratingTypeId' },
    //       averageRating: { $avg: '$rating' },
    //     },
    //   ]);
    //   if (driver.length > 0) {
    //     const averageRating = driver[0].averageRating;
    //     await Driver.findByIdAndUpdate(
    //       req.body.ratingTypeId,
    //       { rating: averageRating },
    //       { new: true }
    //     );
    //   }
    // }
    res
      .status(201)
      .json({ status: true, message: 'Rating updated successfully!' });
  } catch (err) {
    next(err);
  }
};
export const checkRating = async (req, res, next) => {
  const ratingType = req.query.ratingType;
  const ratingTypeId = req.query.ratingTypeId;
  try {
    const existingRating = await Rating.findOne({
      userId: req.user.id,
      ratingType: req.body.ratingType,
      ratingTypeId: req.body.ratingTypeId,
    });
    if (existingRating) {
      res.status(201).json({
        status: true,
        message: `You have already rated this ${existingRating.ratingType}`,
      });
    } else {
      res
        .status(201)
        .json({ status: true, message: 'User has not rated this restaurant' });
    }
  } catch (err) {
    next(err);
  }
};
