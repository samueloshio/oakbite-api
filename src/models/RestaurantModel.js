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
    foods: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Food',
      },
    ],
    pickup: {
      type: Boolean,
      default: true,
    },
    delivery: {
      type: Boolean,
      default: true,
    },
    isAvailable: {
      type: Boolean,
      default: true,
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
    ratings: {
      type: Number,
      min: 1,
      max: 5,
      default: 3,
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
