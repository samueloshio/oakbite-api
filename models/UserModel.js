import mongoose from 'mongoose';
const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: Number,
    },
    profile: {
      type: [String],
    },
    city: {
      type: String,
    },
    address: {
      type: String,
    },
    // isAdmin: {
    //   required: true,
    //   type: Boolean,
    //   default: false,
    // },
  },
  { timestamps: true }
);

export default mongoose.model('User', UserSchema);
