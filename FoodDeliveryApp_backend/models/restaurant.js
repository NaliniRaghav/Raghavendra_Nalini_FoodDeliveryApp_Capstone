import mongoose from 'mongoose';

const RestaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  cuisineType: { type: String, required: true },
  menu: [{ type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem' }],
  averageRating: { type: Number, default: 0 },
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }]
});

const Restaurant = mongoose.model('Restaurant', RestaurantSchema);

export default Restaurant;
