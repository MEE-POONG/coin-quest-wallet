
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
      localStorage.setItem('coinQuestToken', response.data.token);
      localStorage.setItem('coinQuestUser', JSON.stringify(response.data.user));
      return response.data.user;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  register: async (data: RegisterRequest): Promise<User> => {
    try {
      const response = await api.post<LoginResponse>('/auth/register', data);
      localStorage.setItem('coinQuestToken', response.data.token);
      localStorage.setItem('coinQuestUser', JSON.stringify(response.data.user));
      return response.data.user;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  },

  logout: (): void => {
    localStorage.removeItem('coinQuestToken');
    localStorage.removeItem('coinQuestUser');
  },
  
  getCurrentUser: (): User | null => {
    const user = localStorage.getItem('coinQuestUser');
    return user ? JSON.parse(user) : null;
  }
};
