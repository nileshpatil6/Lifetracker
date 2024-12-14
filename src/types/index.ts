export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
}

export interface Metric {
  id: string;
  userId: string;
  category: 'health' | 'productivity' | 'mood' | 'sleep';
  value: number;
  note?: string;
  timestamp: Date;
}

export interface Profile {
  userId: string;
  goals: string[];
  preferences: {
    theme: 'light' | 'dark';
    notifications: boolean;
  };
}

export type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
}
