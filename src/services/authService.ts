
import api from './api';
import { User } from '../types';

interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  user: User;
  token: string;
}

interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

export const authService = {
  login: async (data: LoginRequest): Promise<User> => {
    try {
      const response = await api.post<LoginResponse>('/auth/login', data);
      localStorage.setItem('meCoinsToken', response.data.token);
      localStorage.setItem('meCoinsUser', JSON.stringify(response.data.user));
      return response.data.user;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  register: async (data: RegisterRequest): Promise<User> => {
    try {
      const response = await api.post<LoginResponse>('/auth/register', data);
      localStorage.setItem('meCoinsToken', response.data.token);
      localStorage.setItem('meCoinsUser', JSON.stringify(response.data.user));
      return response.data.user;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  },

  updateUser: async (userId: string, userData: Partial<User>): Promise<User> => {
    try {
      const response = await api.put<User>(`/user/${userId}`, userData);
      // Update local storage
      const currentUser = localStorage.getItem('meCoinsUser');
      if (currentUser) {
        const updatedUser = { ...JSON.parse(currentUser), ...response.data };
        localStorage.setItem('meCoinsUser', JSON.stringify(updatedUser));
      }
      return response.data;
    } catch (error) {
      console.error('Update user error:', error);
      throw error;
    }
  },

  logout: (): void => {
    localStorage.removeItem('meCoinsToken');
    localStorage.removeItem('meCoinsUser');
  },
  
  getCurrentUser: (): User | null => {
    const user = localStorage.getItem('meCoinsUser');
    return user ? JSON.parse(user) : null;
  }
};
