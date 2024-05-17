import mongoose from 'mongoose';

const userPreferencesSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  emailNotifications: {
    type: Boolean,
    default: true,
  },
  theme: {
    type: String,
    default: 'default',
  },
});

const UserPreferences = mongoose.model('UserPreferences', userPreferencesSchema);

export default UserPreferences;