export enum UserRole {
  ADMIN = 'ADMIN',
  NORMAL = 'NORMAL',
  PREMIUM = 'PREMIUM'
}

export interface User {
  id: string;
  username: string;
  email: string;
  role: UserRole;
  balance: number;
  avatar: string;
  createdAt: string;
  bio?: string; // Adding bio as an optional property
}

export interface Transaction {
  id: string;
  userId: string;
  amount: number;
  type: 'DEPOSIT' | 'WITHDRAWAL' | 'PURCHASE' | 'GIFT';
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  createdAt: string;
  updatedAt: string;
  slipImage?: string;
  comment?: string;
}

export interface Item {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  rarity: 'COMMON' | 'UNCOMMON' | 'RARE' | 'EPIC' | 'LEGENDARY';
}

export interface Gift {
  id: string;
  senderId: string;
  recipientId: string;
  itemId?: string;
  amount?: number;
  message: string;
  createdAt: string;
}

export interface DepositRequest {
  id: string;
  userId: string;
  username: string;
  amount: number;
  slipImage: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  comment?: string;
  createdAt: string;
  updatedAt: string;
}

export interface WithdrawRequest {
  id: string;
  userId: string;
  username: string;
  amount: number;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  comment?: string;
  createdAt: string;
  updatedAt: string;
}
