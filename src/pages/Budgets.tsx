import { useMemo, useState } from 'react';
import { useCategories } from '@/context/CategoryContext';
import { useBudgets } from '@/context/BudgetContext';
import { formatCurrency } from '@/utils/formatters';
import { AlertCircle, CheckCircle, Plus, Target, TrendingDown } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { useTranslation } from 'react-i18next';
import NewBudgetModal from '@/components/NewBudgetModal';
import { getCategoryName } from '@/utils/categoryHelpers';

export default function Budgets() {
  const { categories } = useCategories();
  const { budgets } = useBudgets();
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const budgetData = useMemo(() => {
    return budgets.map((budget) => {
      const category = categories.find((c) => c.id === budget.categoryId);
      const percentage = (budget.spent / budget.limit) * 100;
      const remaining = budget.limit - budget.spent;
      const status = percentage >= 100 ? 'exceeded' : percentage >= 80 ? 'warning' : 'good';

      return {
        ...budget,
        category: category ? getCategoryName(category, t) : 'Desconocida',
        categoryIcon: category?.icon,
        color: category?.color || '#gray',
        percentage,
        remaining,
        status,
      };
    });
  }, [categories, budgets, t]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'exceeded':
        return 'bg-red-500';
      case 'warning':
        return 'bg-yellow-500';
      default:
        return 'bg-green-500';
    }
  };

  const getStatusIcon = (status: string) => {
    return status === 'exceeded' || status === 'warning' ? (
      <AlertCircle className="h-5 w-5 text-yellow-600" />
    ) : (
      <CheckCircle className="h-5 w-5 text-green-600" />
    );
  };

  const getCategoryIcon = (iconName?: string) => {
    if (!iconName) return null;
    const IconComponent = (LucideIcons as any)[iconName];
    return IconComponent ? <IconComponent className="h-5 w-5" /> : null;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{t('budgets.title')}</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">{t('budgets.subtitle')}</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="btn-primary flex items-center justify-center"
        >
          <Plus className="h-5 w-5 mr-2" />
          {t('budgets.newBudget')}
        </button>
      </div>

      {/* Budget Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {budgetData.length > 0 ? (
          budgetData.map((budget) => (
            <div key={budget.categoryId} className="card">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center text-white"
                    style={{ backgroundColor: budget.color }}
                  >
                    {getCategoryIcon(budget.categoryIcon)}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{budget.category}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">{budget.period}</p>
                  </div>
                </div>
                {getStatusIcon(budget.status)}
              </div>

              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400 flex items-center gap-1">
                    <TrendingDown className="h-4 w-4" />
                    {t('budgets.spent')}
                  </span>
                  <span className="font-semibold dark:text-white">{formatCurrency(budget.spent)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400 flex items-center gap-1">
                    <Target className="h-4 w-4" />
                    {t('budgets.limit')}
                  </span>
                  <span className="font-semibold dark:text-white">{formatCurrency(budget.limit)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">{t('budgets.remaining')}</span>
                  <span
                    className={`font-semibold ${
                      budget.remaining < 0 ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'
                    }`}
                  >
                    {formatCurrency(Math.abs(budget.remaining))}
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="pt-2">
                  <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mb-1">
                    <span>{budget.percentage.toFixed(0)}% {t('budgets.used')}</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                    <div
                      className={`h-2.5 rounded-full transition-all ${getStatusColor(budget.status)}`}
                      style={{ width: `${Math.min(budget.percentage, 100)}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full card text-center py-12">
            <div className="flex flex-col items-center gap-3">
              <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                <Target className="h-8 w-8 text-gray-400" />
              </div>
              <p className="text-gray-500 dark:text-gray-400">{t('budgets.noBudgets', { defaultValue: 'No hay presupuestos configurados' })}</p>
              <button 
                onClick={() => setIsModalOpen(true)}
                className="btn-primary flex items-center gap-2 mt-2"
              >
                <Plus className="h-4 w-4" />
                {t('budgets.createFirst', { defaultValue: 'Crear primer presupuesto' })}
              </button>
            </div>
          </div>
        )}
      </div>

      <NewBudgetModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
