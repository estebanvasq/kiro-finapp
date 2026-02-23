export type TransactionType = 'income' | 'expense';

export interface Transaction {
  id: string;
  description: string;
  amount: number;
  type: TransactionType;
  category: string;
  date: string;
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  translationKey?: string;
  type: TransactionType;
  color: string;
  icon: string;
  budget?: number;
}

export interface Budget {
  categoryId: string;
  limit: number;
  spent: number;
  period: 'monthly' | 'yearly';
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}
