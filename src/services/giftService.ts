
import api from './api';
import { Gift } from '../types';

interface SendGiftRequest {
  recipientId: string;
  itemId?: string;
  amount?: number;
  message: string;
}

export const giftService = {
  getSentGifts: async (): Promise<Gift[]> => {
    const response = await api.get<Gift[]>('/gifts/sent');
    return response.data;
  },

  getReceivedGifts: async (): Promise<Gift[]> => {
    const response = await api.get<Gift[]>('/gifts/received');
    return response.data;
  },

  sendGift: async (data: SendGiftRequest): Promise<Gift> => {
    const response = await api.post<Gift>('/gifts', data);
    return response.data;
  },
};
