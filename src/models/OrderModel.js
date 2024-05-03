import mongoose from 'mongoose';
const { Schema } = mongoose;

const OrderItemSchema = new Schema(
  {
    foodId: {
      type: Schema.Types.ObjectId,
      ref: 'Food',
    },
    quantity: {
      type: Number,
      default: 1,
    },
    price: {
      type: Number,
      required: true,
    },
    additives: {
      type: Array,
    },
    instructions: {
      type: String,
      default: '',
    },
  },
  { timestamps: true }
);
const OrderSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    orderItems: [OrderItemSchema],
    orderTotal: {
      type: Number,
      required: true,
    },
    deliveryFee: {
      type: Number,
      required: true,
    },
    grandTotal: {
      type: Number,
      required: true,
    },
    deliveryAddress: {
      type: Schema.Types.ObjectId,
      ref: 'Address',
      required: true,
    },
    restaurantAddress: {
      type: String,
      required: true,
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    paymentStatus: {
      type: String,
      default: 'Pending',
      enum: ['Pending', 'Completed', 'Failed'],
    },
    orderStatus: {
      type: String,
      default: 'Pending',
      enum: [
        'Placed',
        'Preparing',
        'Manual',
        'Delivered',
        'Cancelled',
        'Ready',
        'Out_for_Delivery',
      ],
    },
    restaurantId: {
      type: Schema.Types.ObjectId,
      ref: 'Restaurant',
      required: true,
    },
    restaurantCoordinates: [Number],
    recipientCoordinates: [Number],
    driverId: { type: String, default: '' },
    rating: { type: Number, min: 1, max: 5, default: 4 },
    feedback: { type: String },
    promoCode: { type: String },
    discountAmount: { type: Number },
    notes: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model('Order', OrderSchema);
