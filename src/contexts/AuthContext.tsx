/* eslint-disable react-refresh/only-export-components */

import React, { createContext, useState, useContext, useEffect } from 'react';
import { User, UserRole } from '../types';
import { authService } from '../services/authService';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAdmin: boolean;
  isPremium: boolean;
  updateUser: (userData: Partial<User>) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Check for stored user on initial load
  useEffect(() => {
    const storedUser = authService.getCurrentUser();
    if (storedUser) {
      setUser(storedUser);
    }
    setIsLoading(false);
  }, []);
  
  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      const user = await authService.login({ email, password });
      setUser(user);
      setIsLoading(false);
      return true;
    } catch (error) {
      console.error("Login failed:", error);
      setIsLoading(false);
      return false;
    }
  };
  
  const logout = () => {
    authService.logout();
    setUser(null);
  };

  const updateUser = async (userData: Partial<User>): Promise<boolean> => {
    if (!user) return false;
    
    try {
      // Here you would make an API call to update the user
      // For now, we'll just update the local state
      const updatedUser = { ...user, ...userData };
      
      // Save to local storage
      localStorage.setItem('meCoinsUser', JSON.stringify(updatedUser));
      
      // Update state
      setUser(updatedUser);
      return true;
    } catch (error) {
      console.error("Update user failed:", error);
      return false;
    }
  };
  
  const isAdmin = user?.role === UserRole.ADMIN;
  const isPremium = user?.role === UserRole.PREMIUM || user?.role === UserRole.ADMIN;
  
  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, isAdmin, isPremium, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
