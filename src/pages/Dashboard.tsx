import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { Plus, Activity, Brain, Moon, Heart } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { getMetricsByUserId, saveMetric } from '../lib/storage';
import { Metric } from '../types';

const categories = [
  { id: 'health', name: 'Health', icon: Heart, color: 'text-red-500' },
  { id: 'productivity', name: 'Productivity', icon: Activity, color: 'text-green-500' },
  { id: 'mood', name: 'Mood', icon: Brain, color: 'text-blue-500' },
  { id: 'sleep', name: 'Sleep', icon: Moon, color: 'text-purple-500' },
] as const;

export function Dashboard() {
  const { user } = useAuth();
  const [activeCategory, setActiveCategory] = useState<typeof categories[number]['id']>('health');
  const [showAddModal, setShowAddModal] = useState(false);
  const [value, setValue] = useState('');
  const [note, setNote] = useState('');

  const metrics = user ? getMetricsByUserId(user.id) : [];
  const filteredMetrics = metrics.filter((m) => m.category === activeCategory);

  const handleAddMetric = () => {
    if (!user || !value) return;

    const newMetric: Metric = {
      id: Math.random().toString(36).slice(2),
      userId: user.id,
      category: activeCategory,
      value: Number(value),
      note,
      timestamp: new Date(),
    };

    saveMetric(newMetric);
    setShowAddModal(false);
    setValue('');
    setNote('');
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-orange-500 to-pink-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
            onClick={() => setShowAddModal(true)}
          >
            <Plus size={20} />
            <span>Add Entry</span>
          </motion.button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {categories.map((category) => (
            <motion.button
              key={category.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`p-4 rounded-xl flex items-center space-x-3 ${
                activeCategory === category.id
                  ? 'bg-white shadow-lg border-2 border-orange-500'
                  : 'bg-white shadow border border-gray-200'
              }`}
              onClick={() => setActiveCategory(category.id)}
            >
              <category.icon className={category.color} />
              <span className="font-medium">{category.name}</span>
            </motion.button>
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Your Progress</h2>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={filteredMetrics}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="timestamp"
                  tickFormatter={(timestamp) => new Date(timestamp).toLocaleDateString()}
                />
                <YAxis />
                <Tooltip
                  labelFormatter={(timestamp) => new Date(timestamp).toLocaleString()}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#f97316"
                  strokeWidth={2}
                  dot={{ fill: '#f97316' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Add Entry Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-6 w-full max-w-md"
          >
            <h3 className="text-xl font-semibold mb-4">Add New Entry</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Value
                </label>
                <input
                  type="number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Note
                </label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  rows={3}
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                />
              </div>
              <div className="flex space-x-3">
                <button
                  className="flex-1 bg-gradient-to-r from-orange-500 to-pink-500 text-white py-2 rounded-lg"
                  onClick={handleAddMetric}
                >
                  Save
                </button>
                <button
                  className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg"
                  onClick={() => setShowAddModal(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
