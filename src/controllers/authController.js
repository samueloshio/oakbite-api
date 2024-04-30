import User from '../models/UserModel.js';
import jwt from 'jsonwebtoken';
import generateOtp from '../utils/otp_generator.js';
import CryptoJS from 'crypto-js';
import sendEmail from '../utils/send_email.js';

export const signUpUser = async (req, res, next) => {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  if (!emailRegex.test(req.body.email)) {
    return res
      .status(401)
      .json({ status: false, message: 'Email is not valid' });
  }
  const minPasswordLength = 8;
  if (req.body.password < minPasswordLength) {
    return res.status(401).json({
      status: false,
      message:
        'Password should be at least ' + minPasswordLength + ' character',
    });
  }
  try {
    const emailExists = await User.findOne({ email: req.body.email });
    if (emailExists) {
      return res
        .status(401)
        .json({ status: false, message: 'Email already exists' });
    }

    // GENERATE OTP
    const otp = generateOtp();

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: CryptoJS.AES.encrypt(
        req.body.password,
        process.env.SECRET_KEY
      ).toString(),
      userType: 'Client',
      otp: otp,
    });

    // SAVE USER
    await newUser.save();

    // SEND OTP TO EMAIL
    sendEmail(newUser.email, otp);

    res
      .status(201)
      .json({ staus: true, message: 'User created successfully.' });
  } catch (err) {
    next(err);
  }
};

export const signInUser = async (req, res, next) => {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  if (!emailRegex.test(req.body.email)) {
    return res
      .status(401)
      .json({ status: false, message: 'Email is not valid' });
  }
  const minPasswordLength = 8;
  if (req.body.password < minPasswordLength) {
    return res.status(401).json({
      status: false,
      message:
        'Password should be at least ' + minPasswordLength + ' character',
    });
  }
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(401)
        .json({ status: false, message: 'user not found.' });
    }

    // DECRYPT PASSWORD
    const decryptedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.SECRET_KEY
    );
    const hashPassword = decryptedPassword.toString(CryptoJS.enc.Utf8);

    if (hashPassword !== req.body.password) {
      return res.status(401).json({ status: false, message: 'Wrong Password' });
    }

    const userToken = jwt.sign(
      {
        id: user._id,
        userType: user.userType,
        email: user.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: '21d' }
    );

    const { password, otp, createdAt, updatedAt, __v, ...others } = user._doc;

    res.status(201).json({ ...others, userToken });
  } catch (err) {
    next(err);
  }
};
