
import api from './api';
import { Item } from '../types';

interface PurchaseItemRequest {
  itemId: string;
  quantity: number;
}

interface PurchaseItemResponse {
  success: boolean;
  newBalance: number;
}

export const shopService = {
  getItems: async (): Promise<Item[]> => {
    const response = await api.get<Item[]>('/shop/items');
    return response.data;
  },

  purchaseItem: async (data: PurchaseItemRequest): Promise<PurchaseItemResponse> => {
    const response = await api.post<PurchaseItemResponse>('/shop/purchase', data);
    return response.data;
  },
};
