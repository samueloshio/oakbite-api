import Cart from '../models/CartModel.js';

export const addProductToCart = async (req, res, next) => {
  const userId = req.user.id;
  const { productId, totalPrice, quantity, additives } = req.body;

  let count;

  try {
    const existingProduct = await Cart.findOne({
      userId: userId,
      productId: productId,
    });
    count = await Cart.countDocuments({ userId: userId });

    if (existingProduct) {
      existingProduct.totalPrice += totalPrice * quantity;
      existingProduct.quantity += quantity;

      await existingProduct.save();

      res.status(201).json({ status: true, count: count });
    } else {
      const newCartItem = new Cart({
        userId: userId,
        productId: productId,
        totalPrice: totalPrice,
        quantity: quantity,
        additives: additives,
      });

      await newCartItem.save();
      count = await Cart.countDocuments({ userId: userId });

      res.status(201).json({ status: true, count: count });
    }
  } catch (err) {
    next(err);
  }
};

export const removeCartItem = async (req, res, next) => {
  const cartItemId = req.params.id;
  const userId = req.user.id;

  try {
    await Cart.findByIdAndDelete({ _id: cartItemId });
    const count = await Cart.countDocuments({ userId: userId });

    res.status(201).json({ status: true, count: count });
  } catch (err) {
    next(err);
  }
};

export const getCart = async (req, res, next) => {
  const userId = req.user.id;
  try {
    const cart = await Cart.find({ userId: userId }).populate({
      path: 'productId',
      select: 'imageUrl title restaurant rating ratingCount',
      populate: {
        path: 'restaurant',
        select: 'time coordinates',
      },
    });
    res.status(201).json(cart);
  } catch (err) {
    next(err);
  }
};

export const getCartCount = async (req, res, next) => {
  const userId = req.user.id;
  try {
    const count = await Cart.countDocuments({ userId: userId });

    res.status(201).json({ status: true, count: count });
  } catch (err) {
    next(err);
  }
};

export const decrementProductQty = async (req, res, next) => {
  const id = req.params.id;
  const userId = req.user.id;

  try {
    const cartItem = await Cart.findById(id);

    if (cartItem) {
      const productPrice = cartItem.totalPrice / cartItem.quantity;

      if (cartItem.quantity > 1) {
        cartItem.quantity -= 1;
        cartItem.totalPrice -= productPrice;

        await cartItem.save();

        res.status(201).json({
          status: true,
          message: 'Product quantity reduced successfully',
        });
      } else {
        await Cart.findByIdAndDelete({ _id: id });

        res.status(201).json({
          status: true,
          message: 'Product quantity removed successfully',
        });
      }
    } else {
      res.status(401).json({ status: false, message: 'Cart item not found' });
    }
  } catch (err) {
    next(err);
  }
};
