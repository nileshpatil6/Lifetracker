import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Settings, Save } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { getProfile, saveProfile } from '../lib/storage';
import { Profile as ProfileType } from '../types';

export function Profile() {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.name || '');
  const [preferences, setPreferences] = useState<ProfileType['preferences']>(() => {
    if (!user) return { theme: 'light', notifications: true };
    const profile = getProfile(user.id);
    return profile?.preferences || { theme: 'light', notifications: true };
  });

  const handleSave = () => {
    if (!user) return;

    const updatedProfile: ProfileType = {
      userId: user.id,
      goals: [],
      preferences,
    };

    saveProfile(updatedProfile);
    setIsEditing(false);
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-orange-500 hover:text-orange-600"
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? <Save size={24} /> : <Settings size={24} />}
            </motion.button>
          </div>

          <div className="space-y-6">
            {/* Profile Picture */}
            <div className="flex justify-center">
              <div className="w-32 h-32 bg-orange-100 rounded-full flex items-center justify-center">
                <User size={48} className="text-orange-500" />
              </div>
            </div>

            {/* User Info */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={!isEditing}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
                  value={user.email}
                  disabled
                />
              </div>
            </div>

            {/* Preferences */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Preferences</h3>
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Theme</span>
                <select
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  value={preferences.theme}
                  onChange={(e) =>
                    setPreferences({
                      ...preferences,
                      theme: e.target.value as 'light' | 'dark',
                    })
                  }
                  disabled={!isEditing}
                >
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                </select>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Notifications</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={preferences.notifications}
                    onChange={(e) =>
                      setPreferences({
                        ...preferences,
                        notifications: e.target.checked,
                      })
                    }
                    disabled={!isEditing}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                </label>
              </div>
            </div>

            {/* Save Button */}
            {isEditing && (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-orange-500 to-pink-500 text-white py-2 rounded-lg font-semibold"
                onClick={handleSave}
              >
                Save Changes
              </motion.button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
