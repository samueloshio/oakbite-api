import User from '../models/UserModel.js';

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    const { password, __v, createdAt, ...userData } = user._doc;

    res.status(201).json({ ...userData });
  } catch (err) {
    next(err);
  }
};

export const verifyAccount = async (req, res, next) => {
  const userOtp = req.params.otp;
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(401).json({ status: false, message: 'User not found' });
    }

    if (userOtp === user.otp) {
      user.verification = true;
      user.otp = 'none';

      const savedUser = await user.save();

      const { password, __v, otp, createdAt, ...others } = savedUser._doc;
      return res.status(201).json({ ...others });
    } else {
      return res
        .status(401)
        .json({ status: false, message: 'OTP verification failed' });
    }
  } catch (err) {
    next(err);
  }
};

export const verifyPhone = async (req, res, next) => {
  const phone = req.params.phone;
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(401).json({ status: false, message: 'User not found' });
    }

    user.phoneVerification = true;
    user.phone = phone;

    const savedUser = await user.save();

    const { password, __v, otp, createdAt, ...others } = savedUser._doc;
    return res.status(201).json({ ...others });
  } catch (err) {
    next(err);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.user.id);
    res
      .status(201)
      .json({ status: true, message: 'User deleted successfully' });
  } catch (err) {
    next(err);
  }
};
