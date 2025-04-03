
import { User, Transaction, Item, Gift, UserRole, DepositRequest, WithdrawRequest } from '../types';

// Placeholder images - in a real app these would be proper URLs or imports
const PLACEHOLDER_IMAGES = {
  avatar1: '/placeholder.svg',
  avatar2: '/placeholder.svg',
  avatar3: '/placeholder.svg',
  slip1: '/placeholder.svg',
  slip2: '/placeholder.svg',
  slip3: '/placeholder.svg',
  slip4: '/placeholder.svg',
  sword: '/placeholder.svg',
  potion: '/placeholder.svg',
  armor: '/placeholder.svg',
  amulet: '/placeholder.svg',
};

// Mock Users
export const mockUsers: User[] = [
  {
    id: '1',
    username: 'admin',
    email: 'admin@coinquest.com',
    role: UserRole.ADMIN,
    balance: 10000,
    avatar: PLACEHOLDER_IMAGES.avatar1,
    createdAt: '2023-01-01T00:00:00Z',
  },
  {
    id: '2',
    username: 'johndoe',
    email: 'john@example.com',
    role: UserRole.NORMAL,
    balance: 500,
    avatar: PLACEHOLDER_IMAGES.avatar2,
    createdAt: '2023-01-15T00:00:00Z',
  },
  {
    id: '3',
    username: 'alice',
    email: 'alice@example.com',
    role: UserRole.PREMIUM,
    balance: 2500,
    avatar: PLACEHOLDER_IMAGES.avatar3,
    createdAt: '2023-02-01T00:00:00Z',
  },
];

// Mock Transactions
export const mockTransactions: Transaction[] = [
  {
    id: '1',
    userId: '2',
    amount: 100,
    type: 'DEPOSIT',
    status: 'APPROVED',
    createdAt: '2023-03-15T10:30:00Z',
    updatedAt: '2023-03-15T11:00:00Z',
    slipImage: PLACEHOLDER_IMAGES.slip1,
  },
  {
    id: '2',
    userId: '3',
    amount: 500,
    type: 'DEPOSIT',
    status: 'APPROVED',
    createdAt: '2023-03-20T14:45:00Z',
    updatedAt: '2023-03-20T15:30:00Z',
    slipImage: PLACEHOLDER_IMAGES.slip2,
  },
  {
    id: '3',
    userId: '3',
    amount: 200,
    type: 'WITHDRAWAL',
    status: 'PENDING',
    createdAt: '2023-04-01T09:15:00Z',
    updatedAt: '2023-04-01T09:15:00Z',
  },
  {
    id: '4',
    userId: '2',
    amount: 50,
    type: 'PURCHASE',
    status: 'APPROVED',
    createdAt: '2023-04-05T16:20:00Z',
    updatedAt: '2023-04-05T16:20:00Z',
  },
];

// Mock Items
export const mockItems: Item[] = [
  {
    id: '1',
    name: 'Crystal Sword',
    description: 'A legendary sword made of pure crystal.',
    price: 1000,
    image: PLACEHOLDER_IMAGES.sword,
    category: 'Weapon',
    rarity: 'LEGENDARY',
  },
  {
    id: '2',
    name: 'Health Potion',
    description: 'Restores 50 health points.',
    price: 50,
    image: PLACEHOLDER_IMAGES.potion,
    category: 'Consumable',
    rarity: 'COMMON',
  },
  {
    id: '3',
    name: 'Dragon Scale Armor',
    description: 'Armor made from the scales of an ancient dragon.',
    price: 800,
    image: PLACEHOLDER_IMAGES.armor,
    category: 'Armor',
    rarity: 'EPIC',
  },
  {
    id: '4',
    name: 'Magic Amulet',
    description: 'Increases magic power by 20%.',
    price: 500,
    image: PLACEHOLDER_IMAGES.amulet,
    category: 'Accessory',
    rarity: 'RARE',
  },
];

// Mock Deposit Requests
export const mockDepositRequests: DepositRequest[] = [
  {
    id: '1',
    userId: '2',
    username: 'johndoe',
    amount: 200,
    slipImage: PLACEHOLDER_IMAGES.slip3,
    status: 'PENDING',
    createdAt: '2023-04-10T08:30:00Z',
    updatedAt: '2023-04-10T08:30:00Z',
  },
  {
    id: '2',
    userId: '3',
    username: 'alice',
    amount: 500,
    slipImage: PLACEHOLDER_IMAGES.slip4,
    status: 'PENDING',
    createdAt: '2023-04-12T14:20:00Z',
    updatedAt: '2023-04-12T14:20:00Z',
  },
];

// Mock Withdraw Requests
export const mockWithdrawRequests: WithdrawRequest[] = [
  {
    id: '1',
    userId: '3',
    username: 'alice',
    amount: 300,
    status: 'PENDING',
    createdAt: '2023-04-15T10:45:00Z',
    updatedAt: '2023-04-15T10:45:00Z',
  },
];

// Mock Gifts
export const mockGifts: Gift[] = [
  {
    id: '1',
    senderId: '3',
    recipientId: '2',
    itemId: '2',
    message: 'Hope this helps in your quest!',
    createdAt: '2023-04-08T11:30:00Z',
  },
  {
    id: '2',
    senderId: '2',
    recipientId: '3',
    amount: 100,
    message: 'Thanks for your help last time!',
    createdAt: '2023-04-09T15:45:00Z',
  },
];

export const getCurrentUser = (): User | null => {
  // In a real app, this would come from authentication
  return mockUsers[0]; // Return admin user for now
};
