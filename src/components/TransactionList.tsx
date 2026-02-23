import { Transaction } from '@/types';
import { formatCurrency, formatShortDate } from '@/utils/formatters';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useCategories } from '@/context/CategoryContext';
import { getCategoryName } from '@/utils/categoryHelpers';

interface TransactionListProps {
  transactions: Transaction[];
  limit?: number;
}

export default function TransactionList({ transactions, limit }: TransactionListProps) {
  const displayTransactions = limit ? transactions.slice(0, limit) : transactions;
  const { t } = useTranslation();
  const { categories } = useCategories();

  const getCategoryDisplayName = (categoryName: string) => {
    const category = categories.find(c => c.name === categoryName);
    return category ? getCategoryName(category, t) : categoryName;
  };

  const getCategoryIcon = (categoryName: string) => {
    const category = categories.find(c => c.name === categoryName);
    if (!category || !category.icon) return null;
    
    const IconComponent = (LucideIcons as any)[category.icon];
    return IconComponent ? <IconComponent className="h-4 w-4" /> : null;
  };

  const getCategoryColor = (categoryName: string) => {
    const category = categories.find(c => c.name === categoryName);
    return category?.color || '#6b7280';
  };

  return (
    <div className="space-y-3">
      {displayTransactions.map((transaction) => (
        <div
          key={transaction.id}
          className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
        >
          <div className="flex items-center space-x-4">
            <div
              className={`p-2 rounded-full ${
                transaction.type === 'income' ? 'bg-green-50 dark:bg-green-900/30' : 'bg-red-50 dark:bg-red-900/30'
              }`}
            >
              {transaction.type === 'income' ? (
                <ArrowUpRight className="h-5 w-5 text-green-600 dark:text-green-400" />
              ) : (
                <ArrowDownRight className="h-5 w-5 text-red-600 dark:text-red-400" />
              )}
            </div>
            <div className="flex items-center gap-2">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center text-white"
                style={{ backgroundColor: getCategoryColor(transaction.category) }}
              >
                {getCategoryIcon(transaction.category)}
              </div>
              <div>
                <p className="font-medium text-gray-900 dark:text-white">{transaction.description}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {getCategoryDisplayName(transaction.category)} • {formatShortDate(transaction.date)}
                </p>
              </div>
            </div>
          </div>
          <div className="text-right">
            <p
              className={`font-semibold ${
                transaction.type === 'income' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
              }`}
            >
              {transaction.type === 'income' ? '+' : '-'}
              {formatCurrency(transaction.amount)}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
