import mongoose from 'mongoose';
const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    otp: {
      type: String,
      required: false,
      default: 'none',
    },
    password: {
      type: String,
      required: true,
    },
    verification: {
      type: Boolean,
      default: false,
    },
    phone: {
      type: String,
      default: '0123456789',
    },
    phoneVerification: {
      type: String,
      default: false,
    },
    address: {
      type: Schema.Types.ObjectId,
      ref: 'Address',
      required: false,
    },
    userType: {
      required: true,
      type: String,
      default: 'Client',
      enum: ['Client', 'Admin', 'Vendor', 'Driver'],
    },
    profile: {
      type: String,
      default: 'OS',
    },
  },
  { timestamps: true }
);

export default mongoose.model('User', UserSchema);
