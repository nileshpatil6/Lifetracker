import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, AuthState } from '../types';
import { getUser, saveUser, removeUser } from '../lib/storage';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
  });

  useEffect(() => {
    const user = getUser();
    if (user) {
      setState({ user, isAuthenticated: true });
    }
  }, []);

  const login = async (email: string, password: string) => {
    // In a real app, this would make an API call
    // For demo, we'll create a mock user
    const user: User = {
      id: Math.random().toString(36).slice(2),
      email,
      name: email.split('@')[0],
      createdAt: new Date(),
    };
    saveUser(user);
    setState({ user, isAuthenticated: true });
  };

  const register = async (email: string, password: string, name: string) => {
    // In a real app, this would make an API call
    const user: User = {
      id: Math.random().toString(36).slice(2),
      email,
      name,
      createdAt: new Date(),
    };
    saveUser(user);
    setState({ user, isAuthenticated: true });
  };

  const logout = () => {
    removeUser();
    setState({ user: null, isAuthenticated: false });
  };

  return (
    <AuthContext.Provider value={{ ...state, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
