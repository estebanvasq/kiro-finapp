import { useState } from 'react';
import { X, DollarSign, Calendar, Tag as TagIcon } from 'lucide-react';
import { useCategories } from '@/context/CategoryContext';
import { useBudgets } from '@/context/BudgetContext';
import { Budget } from '@/types';
import { useTranslation } from 'react-i18next';

interface NewBudgetModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NewBudgetModal({ isOpen, onClose }: NewBudgetModalProps) {
  const { categories } = useCategories();
  const { budgets, addBudget, updateBudget } = useBudgets();
  const { t } = useTranslation();
  
  const [formData, setFormData] = useState({
    categoryId: '',
    limit: '',
    period: 'monthly' as 'monthly' | 'yearly',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.categoryId || !formData.limit) return;

    const existingBudget = budgets.find(b => b.categoryId === formData.categoryId);
    
    const budgetData: Budget = {
      categoryId: formData.categoryId,
      limit: parseFloat(formData.limit),
      spent: existingBudget?.spent || 0,
      period: formData.period,
    };

    if (existingBudget) {
      updateBudget(formData.categoryId, budgetData);
    } else {
      addBudget(budgetData);
    }

    setFormData({ categoryId: '', limit: '', period: 'monthly' });
    onClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            {t('budgets.newBudget')}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <div className="flex items-center gap-2">
                <TagIcon className="h-4 w-4" />
                {t('budgets.category')}
              </div>
            </label>
            <select
              name="categoryId"
              value={formData.categoryId}
              onChange={handleChange}
              required
              className="input"
            >
              <option value="">{t('budgets.selectCategory')}</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.translationKey ? t(category.translationKey) : category.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                {t('budgets.limit')}
              </div>
            </label>
            <input
              type="number"
              name="limit"
              value={formData.limit}
              onChange={handleChange}
              required
              min="0"
              step="0.01"
              className="input"
              placeholder="0.00"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {t('budgets.period')}
              </div>
            </label>
            <select
              name="period"
              value={formData.period}
              onChange={handleChange}
              className="input"
            >
              <option value="monthly">{t('budgets.monthly')}</option>
              <option value="yearly">{t('budgets.yearly')}</option>
            </select>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary flex-1"
            >
              {t('common.cancel')}
            </button>
            <button
              type="submit"
              className="btn-primary flex-1"
            >
              {t('common.save')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
