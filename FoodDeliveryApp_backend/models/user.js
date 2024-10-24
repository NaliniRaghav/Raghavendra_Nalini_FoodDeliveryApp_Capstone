import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

// Method to compare passwords (plain-text comparison)
UserSchema.methods.comparePassword = function(candidatePassword) {
  return candidatePassword === this.password;
};

// Create the User model
const User = mongoose.model('User', UserSchema);

export default User;
