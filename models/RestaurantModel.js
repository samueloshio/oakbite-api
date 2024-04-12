import mongoose from 'mongoose';
const { Schema } = mongoose;

const RestaurantSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    foods: {
      type: Array,
      dafault: [],
    },
    pickup: {
      type: Boolean,
      required: true,
    },
    delivery: {
      type: Boolean,
      required: true,
    },
    isAvailable: {
      type: Boolean,
      required: true,
    },
    owner: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
    logoUrl: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    ratingCount: {
      type: Number,
      default: '267',
    },
    verification: {
      type: String,
      default: 'Pending',
      enum: ['Pending', 'Verified', 'Rejected'],
    },
    verificationMessage: {
      type: String,
      default:
        'Your restaurant is under review. We will notify you once it is verified.',
    },
    coordinates: {
      id: { type: String },
      latitude: { type: Number, require: true },
      longitude: { type: Number, require: true },
      latitudeDelta: { type: Number, default: 0.0122 },
      longitudeDelta: { type: Number, default: 0.0122 },
      address: { type: String, require: true },
      title: { type: String, require: true },
    },
  },
  { timestamps: true }
);

export default mongoose.model('Restaurant', RestaurantSchema);
