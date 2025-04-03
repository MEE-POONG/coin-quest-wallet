
import api from './api';
import { User, UserRole } from '../types';

interface UpdateUserRequest {
  id: string;
  role?: UserRole;
  balance?: number;
  isActive?: boolean;
}

export const userService = {
  getUsers: async (): Promise<User[]> => {
    const response = await api.get<User[]>('/users');
    return response.data;
  },

  getUser: async (id: string): Promise<User> => {
    const response = await api.get<User>(`/users/${id}`);
    return response.data;
  },

  updateUser: async (data: UpdateUserRequest): Promise<User> => {
    const response = await api.patch<User>(`/users/${data.id}`, data);
    return response.data;
  },
};
