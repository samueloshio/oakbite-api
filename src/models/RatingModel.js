import mongoose from 'mongoose';
const { Schema } = mongoose;

const RatingSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    ratingType: {
      type: String,
      required: true,
      enum: ['Restaurant', 'Driver', 'Food'],
    },
    // The Id of what is rated. Such as Restaurant or Driver or Food
    ratingTypeId: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Rating', RatingSchema);
