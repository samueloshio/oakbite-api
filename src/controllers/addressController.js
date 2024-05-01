import User from '../models/UserModel.js';
import Address from '../models/AddressModel.js';

export const addAddress = async (req, res, next) => {
  const newAddress = new Address({
    userId: req.user.id,
    addressLine1: req.body.addressLine1,
    postalCode: req.body.postalCode,
    defaultAddress: req.body.defaultAddress,
    deliveryInstructions: req.body.deliveryInstructions,
    latitude: req.body.latitude,
    longitude: req.body.longitude,
  });
  try {
    if (req.body.defaultAddress === true) {
      await Address.updateMany(
        { userId: req.user.id },
        { defaultAddress: false }
      );
    }

    await newAddress.save();
    res
      .status(201)
      .json({ status: true, message: 'Address added successfully' });
  } catch (err) {
    next(err);
  }
};

export const getAllAddresses = async (req, res, next) => {
  try {
    const addresses = await Address.find({ userId: req.user.id });

    res.status(201).json(addresses);
  } catch (err) {
    next(err);
  }
};

export const deleteAddress = async (req, res, next) => {
  try {
    const addresses = await Address.findByIdAndDelete(req.params.id);

    res
      .status(201)
      .json({ status: true, message: 'Address deleted successfully' });
  } catch (err) {
    next(err);
  }
};

export const setDefaultAddress = async (req, res, next) => {
  const addressId = req.params.id;
  const userId = req.user.id;

  try {
    const addresses = await Address.updateMany(
      { userId: userId },
      { defaultAddress: false }
    );

    const updatedAddress = await Address.findByIdAndUpdate(addressId, {
      defaultAddress: true,
    });

    if (updatedAddress) {
      await User.findByIdAndUpdate(userId, { address: addressId });

      res
        .status(201)
        .json({ status: true, message: 'Address set as default successfully' });
    } else {
      res.status(201).json({ status: false, message: 'Address not found' });
    }
  } catch (err) {
    next(err);
  }
};

export const getDefaultAddress = async (req, res, next) => {
  const userId = req.user.id;
  try {
    const address = await Address.findOne({
      userId: userId,
      defaultAddress: true,
    });

    res.status(201).json(address);
  } catch (err) {
    next(err);
  }
};
