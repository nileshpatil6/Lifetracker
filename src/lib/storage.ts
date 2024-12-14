import { User, Metric, Profile } from '../types';

const STORAGE_KEYS = {
  USER: 'life-tracker-user',
  METRICS: 'life-tracker-metrics',
  PROFILE: 'life-tracker-profile',
} as const;

// User management
export const saveUser = (user: User) => {
  localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
};

export const getUser = (): User | null => {
  const user = localStorage.getItem(STORAGE_KEYS.USER);
  return user ? JSON.parse(user) : null;
};

export const removeUser = () => {
  localStorage.removeItem(STORAGE_KEYS.USER);
};

// Metrics management
export const saveMetric = (metric: Metric) => {
  const metrics = getMetrics();
  metrics.push(metric);
  localStorage.setItem(STORAGE_KEYS.METRICS, JSON.stringify(metrics));
};

export const getMetrics = (): Metric[] => {
  const metrics = localStorage.getItem(STORAGE_KEYS.METRICS);
  return metrics ? JSON.parse(metrics) : [];
};

export const getMetricsByUserId = (userId: string): Metric[] => {
  return getMetrics().filter(metric => metric.userId === userId);
};

export const updateMetric = (id: string, updates: Partial<Metric>) => {
  const metrics = getMetrics();
  const index = metrics.findIndex(m => m.id === id);
  if (index !== -1) {
    metrics[index] = { ...metrics[index], ...updates };
    localStorage.setItem(STORAGE_KEYS.METRICS, JSON.stringify(metrics));
  }
};

export const deleteMetric = (id: string) => {
  const metrics = getMetrics().filter(m => m.id !== id);
  localStorage.setItem(STORAGE_KEYS.METRICS, JSON.stringify(metrics));
};

// Profile management
export const saveProfile = (profile: Profile) => {
  localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
};

export const getProfile = (userId: string): Profile | null => {
  const profile = localStorage.getItem(STORAGE_KEYS.PROFILE);
  if (!profile) return null;
  const parsed = JSON.parse(profile);
  return parsed.userId === userId ? parsed : null;
};

export const updateProfile = (userId: string, updates: Partial<Profile>) => {
  const profile = getProfile(userId);
  if (profile) {
    const updated = { ...profile, ...updates };
    localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(updated));
  }
};
