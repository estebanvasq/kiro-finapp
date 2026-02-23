import { createContext, useContext, useState, ReactNode } from 'react';
import { Budget } from '@/types';
import { mockBudgets } from '@/data/mockData';

interface BudgetContextType {
  budgets: Budget[];
  addBudget: (budget: Budget) => void;
  updateBudget: (categoryId: string, budget: Partial<Budget>) => void;
  deleteBudget: (categoryId: string) => void;
}

const BudgetContext = createContext<BudgetContextType | undefined>(undefined);

export function BudgetProvider({ children }: { children: ReactNode }) {
  const [budgets, setBudgets] = useState<Budget[]>(mockBudgets);

  const addBudget = (budget: Budget) => {
    setBudgets(prev => [...prev, budget]);
  };

  const updateBudget = (categoryId: string, budget: Partial<Budget>) => {
    setBudgets(prev =>
      prev.map(b => (b.categoryId === categoryId ? { ...b, ...budget } : b))
    );
  };

  const deleteBudget = (categoryId: string) => {
    setBudgets(prev => prev.filter(b => b.categoryId !== categoryId));
  };

  return (
    <BudgetContext.Provider value={{ budgets, addBudget, updateBudget, deleteBudget }}>
      {children}
    </BudgetContext.Provider>
  );
}

export function useBudgets() {
  const context = useContext(BudgetContext);
  if (!context) {
    throw new Error('useBudgets must be used within BudgetProvider');
  }
  return context;
}
