import UserPreferences from '../models/userPreferencesModel.mjs';

export async function getUserPreferences(userId) {
  try {
    const preferences = await UserPreferences.findOne({ userId });
    return preferences;
  } catch (error) {
    throw new Error('Failed to fetch user preferences');
  }
}

export async function updateUserPreferences(userId, preferences) {
  try {
    const updatedPreferences = await UserPreferences.findOneAndUpdate(
      { userId },
      preferences,
      { new: true, upsert: true }
    );
    return updatedPreferences;
  } catch (error) {
    throw new Error('Failed to update user preferences');
  }
}