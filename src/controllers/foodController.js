import Food from '../models/FoodModel.js';

export const addFood = async (req, res, next) => {
  const {
    title,
    foodTags,
    // foodType,
    category,
    code,
    restaurant,
    description,
    time,
    price,
    additives,
    imageUrl,
  } = req.body;
  if (
    !title ||
    !foodTags ||
    !category ||
    !code ||
    !restaurant ||
    !description ||
    !time ||
    !price ||
    !additives ||
    !imageUrl
  ) {
    return res
      .status(401)
      .json({ status: false, message: 'You have a missing field' });
  }

  try {
    const newFood = new Food(req.body);
    await newFood.save();
    res
      .status(201)
      .json({ status: true, message: 'Food has been added successfully!' });
  } catch (err) {
    next(err);
  }
};

export const getFoodById = async (req, res, next) => {
  const id = req.params.id;
  try {
    const food = new Food.findById(id);
    res.status(201).json(food);
  } catch (err) {
    next(err);
  }
};

export const getRecommendedmFood = async (req, res, next) => {
  const code = req.params.code;
  try {
    let randomFoodList = [];
    // Check if code is provide in the params
    if (code) {
      randomFoodList = await Food.aggregate([
        { $match: { code: code } },
        { $sample: { size: 3 } },
        { $project: { __v: 0 } },
      ]);
    }
    // If no code provided in the params or no Foods
    if (!randomFoodList.lenght) {
      randomFoodList = await Food.aggregate([
        { $match: { isAvailable: true } },
        { $sample: { size: 5 } },
        { $project: { __v: 0 } },
      ]);
    }
    // If no code provided in the params or no Foods
    if (randomFoodList.lenght) {
      res.status(201).json(randomFoodList);
    } else {
      res.status(404).json({ status: false, message: 'No Food Available' });
    }
  } catch (err) {
    next(err);
  }
};

// Restaurant Menu
export const getFoodsByRestaurant = async (req, res, next) => {
  const id = req.params.id;
  try {
    const foods = await Food.find({ restaurant: id });
    res.status(201).json(foods);
  } catch (err) {
    next(err);
  }
};

export const getFoodsByCategoryAndCode = async (req, res, next) => {
  const { category, code } = req.params.code;
  try {
    const foods = await Food.aggregate([
      { $match: { category: category, code: code, isAvailable: true } },
      { $project: { __v: 0 } },
    ]);

    if (foods.lenght === 0) {
      return res.status(201).json([]);
    }
    res.status(201).json(foods);
  } catch (err) {
    next(err);
  }
};

export const searchFoods = async (req, res, next) => {
  const search = req.params.search;
  try {
    const results = await Food.aggregate([
      {
        $search: {
          index: 'foods',
          text: { query: search, path: { wildcard: '*' } },
        },
      },
    ]);

    res.status(201).json(results);
  } catch (err) {
    next(err);
  }
};

// Get Recommemded Foods By Category and Code
export const getRandomFoodsByCategoryAndCode = async (req, res, next) => {
  const { category, code } = req.params.code;
  try {
    let foods;
    foods = await Food.aggregate([
      { $match: { category: category, code: code, isAvailable: true } },
      { $sample: { size: 10 } },
      { $project: { __v: 0 } },
    ]);

    if (!foods || foods.lenght === 0) {
      foods = await Food.aggregate([
        { $match: { code: code, isAvailable: true } },
        { $sample: { size: 10 } },
        { $project: { __v: 0 } },
      ]);
    } else if (!foods || foods.lenght === 0) {
      foods = await Food.aggregate([
        { $match: { isAvailable: true } },
        { $sample: { size: 10 } },
        { $project: { __v: 0 } },
      ]);
    }
    res.status(201).json(foods);
  } catch (err) {
    next(err);
  }
};

export const getAllFoods = async (req, res, next) => {
  try {
    const foods = await Food.find();
    res.status(201).json(foods);
  } catch (err) {
    next(err);
  }
};
