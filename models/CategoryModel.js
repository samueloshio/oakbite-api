import mongoose from 'mongoose';
const { Schema } = mongoose;

const CategorySchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Category', CategorySchema);
