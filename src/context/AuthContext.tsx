"use client";

import type { User } from '@/lib/types';
import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

interface AuthContextType {
  currentUser: User | null;
  login: (email: string, name?: string) => void;
  signup: (email: string, name?: string) => void;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('currentUser');
      if (storedUser) {
        setCurrentUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Failed to parse user from localStorage", error);
      localStorage.removeItem('currentUser');
    }
    setLoading(false);
  }, []);

  const login = (email: string, name: string = "Demo User") => {
    // In a real app, you'd call an API. Here, we simulate it.
    const user: User = { id: Date.now().toString(), email, name };
    localStorage.setItem('currentUser', JSON.stringify(user));
    setCurrentUser(user);
  };

  const signup = (email: string, name: string = "New User") => {
    // Simulate signup, same as login for this basic example
    const user: User = { id: Date.now().toString(), email, name };
    localStorage.setItem('currentUser', JSON.stringify(user));
    setCurrentUser(user);
  };

  const logout = () => {
    localStorage.removeItem('currentUser');
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, signup, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
