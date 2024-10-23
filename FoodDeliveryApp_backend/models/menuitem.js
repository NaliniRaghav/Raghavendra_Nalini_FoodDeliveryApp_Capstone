import mongoose from 'mongoose';

const MenuItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  category: { type: String },
  restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant' }
});

const MenuItem = mongoose.model('MenuItem', MenuItemSchema);

export default MenuItem;
