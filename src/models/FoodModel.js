import mongoose from 'mongoose';
const { Schema } = mongoose;

const FoodSchema = new Schema(
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
    foodTags: {
      type: Array,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    foodType: {
      type: Array,
      required: true,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    restaurant: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      default: 3,
    },
    ratingCount: {
      type: Number,
      default: '267',
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    additives: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

export default mongoose.model('Food', FoodSchema);
