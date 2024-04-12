import Category from '../models/CategoryModel.js';

export const createCategory = async (req, res, next) => {
  const newCategory = new Category(req.body);
  try {
    await newCategory.save();
    res.status(201).json({
      status: true,
      message: `Category ${newCategory.title} created Successfully`,
    });
  } catch (err) {
    next(err);
  }
};

export const getAllCategories = async (req, res, next) => {
  try {
    const catogories = await Category.find(
      { title: { $ne: 'More' } },
      { __v: 0 }
    );
    res.status(201).json(catogories);
  } catch (err) {
    next(err);
  }
};

export const getRandomCategory = async (req, res, next) => {
  try {
    let categories = await Category.aggregate([
      { $match: { value: { $ne: 'more' } } },
      { $sample: { size: 4 } },
    ]);
    const moreCategory = await Category.findOne({ value: 'more' }, { __v: 0 });
    if (moreCategory) {
      categories.push(moreCategory);
    }
    res.status(201).json(categories);
  } catch (err) {
    next(err);
  }
};
