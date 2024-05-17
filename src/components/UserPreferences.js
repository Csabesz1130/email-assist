import React, { useState } from 'react';
import axios from 'axios';

const UserPreferences = () => {
  const [preferences, setPreferences] = useState({
    emailNotifications: false,
    theme: 'light',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPreferences({
      ...preferences,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/user/preferences', preferences);
      alert('Preferences saved successfully!');
    } catch (error) {
      console.error('Error saving preferences:', error);
      alert('Failed to save preferences.');
    }
  };

  return (
    <div>
      <h2>User Preferences</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            <input
              type="checkbox"
              name="emailNotifications"
              checked={preferences.emailNotifications}
              onChange={handleChange}
            />
            Email Notifications
          </label>
        </div>
        <div>
          <label>
            Theme:
            <select name="theme" value={preferences.theme} onChange={handleChange}>
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </label>
        </div>
        <button type="submit">Save Preferences</button>
      </form>
    </div>
  );
};

export default UserPreferences;
