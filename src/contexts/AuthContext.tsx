
import React, { createContext, useState, useContext, useEffect } from 'react';
import { User, UserRole } from '../types';
import { mockUsers } from '../data/mockData';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAdmin: boolean;
  isPremium: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Check for stored user on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem('coinQuestUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);
  
  const login = async (email: string, password: string): Promise<boolean> => {
    // Mock authentication
    setIsLoading(true);
    
    // Simulate network request
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const foundUser = mockUsers.find(u => u.email === email);
    
    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem('coinQuestUser', JSON.stringify(foundUser));
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };
  
  const logout = () => {
    setUser(null);
    localStorage.removeItem('coinQuestUser');
  };
  
  const isAdmin = user?.role === UserRole.ADMIN;
  const isPremium = user?.role === UserRole.PREMIUM || user?.role === UserRole.ADMIN;
  
  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, isAdmin, isPremium }}>
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
