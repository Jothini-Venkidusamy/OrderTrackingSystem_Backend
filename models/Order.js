import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  orderId: { type: String, required: true, unique: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  product: {
    id: Number,
    title: String,
    price: Number,
    image: String
  },
  deliveryAddress: {
    fullName: String,
    street: String,
    city: String,
    pincode: String,
    mobile: String
  },
  status: {
    type: String,
    enum: ['Ordered', 'Packed', 'Shipped', 'Delivered'],
    default: 'Ordered'
  },
  expectedDelivery: Date,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Order', orderSchema);
