import mongoose from 'mongoose';
const { Schema } = mongoose;

const AddressSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    addressLine1: {
      type: String,
      required: true,
    },
    postalCode: {
      type: String,
      required: true,
    },
    defaultAddress: {
      type: Boolean,
      default: false,
    },
    deliveryInstructions: {
      type: String,
      required: false,
    },
    latitude: {
      type: Number,
      required: false,
    },
    longitude: {
      type: Number,
      required: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Address', AddressSchema);
