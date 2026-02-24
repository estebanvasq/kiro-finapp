import { useState, useMemo, useEffect } from 'react';
import { mockTransactions } from '@/data/mockData';
import TransactionList from '@/components/TransactionList';
import NewTransactionModal from '@/components/NewTransactionModal';
import { Search, Filter, Plus, Tag } from 'lucide-react';
import { Transaction, TransactionType } from '@/types';
import { useCategories } from '@/context/CategoryContext';
import { useTranslation } from 'react-i18next';

export default function Transactions() {
  const { categories } = useCategories();
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'income' | 'expense'>('all');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions);

  // Filtrar categorías según el tipo de transacción seleccionado
  const availableCategories = useMemo(() => {
    if (filterType === 'all') {
      return categories;
    }
    return categories.filter(cat => cat.type === filterType);
  }, [categories, filterType]);

  // Resetear el filtro de categoría cuando cambie el tipo y la categoría seleccionada no esté disponible
  useEffect(() => {
    if (filterCategory !== 'all') {
      const isCategoryAvailable = availableCategories.some(cat => cat.name === filterCategory);
      if (!isCategoryAvailable) {
        setFilterCategory('all');
      }
    }
  }, [filterType, filterCategory, availableCategories]);

  const filteredTransactions = useMemo(() => {
    return transactions
      .filter((t) => {
        const matchesSearch = t.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            t.category.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesType = filterType === 'all' || t.type === filterType;
        const matchesCategory = filterCategory === 'all' || t.category === filterCategory;
        return matchesSearch && matchesType && matchesCategory;
      })
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }, [transactions, searchTerm, filterType, filterCategory]);

  const handleSaveTransaction = (newTransaction: {
    description: string;
    amount: number;
    type: TransactionType;
    category: string;
    date: string;
  }) => {
    const transaction: Transaction = {
      id: Date.now().toString(),
      ...newTransaction,
      createdAt: new Date().toISOString(),
    };
    
    setTransactions([transaction, ...transactions]);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{t('transactions.title')}</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">{t('transactions.subtitle')}</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="btn-primary flex items-center justify-center"
        >
          <Plus className="h-5 w-5 mr-2" />
          {t('transactions.newTransaction')}
        </button>
      </div>

      {/* Filters */}
      <div className="card">
        <div className="flex flex-col gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder={t('common.search')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          {/* Type and Category Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Type Filter */}
            <div className="flex items-center gap-2 flex-1">
              <Filter className="h-5 w-5 text-gray-400" />
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value as 'all' | 'income' | 'expense')}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="all">{t('transactions.all')}</option>
                <option value="income">{t('transactions.income')}</option>
                <option value="expense">{t('transactions.expense')}</option>
              </select>
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-2 flex-1">
              <Tag className="h-5 w-5 text-gray-400" />
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="all">{t('transactions.allCategories')}</option>
                {availableCategories.map((category) => (
                  <option key={category.id} value={category.name}>
                    {category.translationKey ? t(category.translationKey) : category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Transaction List */}
      <div>
        {filteredTransactions.length > 0 ? (
          <TransactionList transactions={filteredTransactions} />
        ) : (
          <div className="card text-center py-12">
            <div className="flex flex-col items-center gap-3">
              <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                <Search className="h-8 w-8 text-gray-400" />
              </div>
              <p className="text-gray-500 dark:text-gray-400">{t('transactions.noTransactionsFound')}</p>
            </div>
          </div>
        )}
      </div>

      {/* Modal */}
      <NewTransactionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveTransaction}
      />
    </div>
  );
}
