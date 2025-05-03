import api from './api';
import { Transaction, DepositRequest, WithdrawRequest } from '../types';

export interface CreateDepositRequest {
  amount: number;
  slipImage: string;
}

export interface CreateWithdrawRequest {
  amount: number;
}

export interface UpdateRequestStatus {
  id: string;
  status: 'APPROVED' | 'REJECTED';
  comment?: string;
}

export const transactionService = {
  // Transactions
  getTransactions: async (): Promise<Transaction[]> => {
    const response = await api.get<Transaction[]>('/transactions');
    return response.data;
  },

  // Deposits
  createDepositRequest: async (data: CreateDepositRequest): Promise<DepositRequest> => {
    const response = await api.post<DepositRequest>('/transactions/deposits', {
      amount: data.amount,
      slipImage: data.slipImage
    });
    return response.data;
  },

  getDepositRequests: async (): Promise<DepositRequest[]> => {
    const response = await api.get<DepositRequest[]>('/transactions/deposits');
    return response.data;
  },

  updateDepositStatus: async (data: UpdateRequestStatus): Promise<DepositRequest> => {
    const response = await api.patch<DepositRequest>(`/transactions/deposits/${data.id}/status`, {
      status: data.status,
      comment: data.comment,
    });
    return response.data;
  },

  // Withdrawals
  createWithdrawRequest: async (data: CreateWithdrawRequest): Promise<WithdrawRequest> => {
    const response = await api.post<WithdrawRequest>('/transactions/withdrawals', data);
    return response.data;
  },

  getWithdrawRequests: async (): Promise<WithdrawRequest[]> => {
    const response = await api.get<WithdrawRequest[]>('/transactions/withdrawals');
    return response.data;
  },

  updateWithdrawStatus: async (data: UpdateRequestStatus): Promise<WithdrawRequest> => {
    const response = await api.patch<WithdrawRequest>(`/transactions/withdrawals/${data.id}/status`, {
      status: data.status,
      comment: data.comment,
    });
    return response.data;
  },
};
