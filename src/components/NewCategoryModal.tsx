import { useState } from 'react';
import { X, Palette, Type, Tag as TagIcon } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { TransactionType } from '@/types';
import { useTranslation } from 'react-i18next';

interface NewCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (category: {
    name: string;
    type: TransactionType;
    color: string;
    icon: string;
  }) => void;
}

const AVAILABLE_COLORS = [
  '#ef4444', '#f59e0b', '#10b981', '#3b82f6', '#8b5cf6',
  '#ec4899', '#06b6d4', '#14b8a6', '#f97316', '#84cc16',
];

const INCOME_ICONS = [
  'TrendingUp', 'Briefcase', 'DollarSign', 'PiggyBank', 'Wallet',
  'CreditCard', 'Gift', 'Award', 'Star', 'Coins',
];

const EXPENSE_ICONS = [
  'ShoppingCart', 'Car', 'Home', 'Film', 'Heart', 'BookOpen',
  'Coffee', 'Smartphone', 'Plane', 'Gift', 'Music', 'Utensils',
  'Dumbbell', 'Shirt', 'Zap', 'Droplet',
];

export default function NewCategoryModal({ isOpen, onClose, onSave }: NewCategoryModalProps) {
  const { t } = useTranslation();
  const [name, setName] = useState('');
  const [type, setType] = useState<TransactionType>('expense');
  const [color, setColor] = useState(AVAILABLE_COLORS[0]);
  const [icon, setIcon] = useState(EXPENSE_ICONS[0]);

  // Get available icons based on type
  const availableIcons = type === 'income' ? INCOME_ICONS : EXPENSE_ICONS;

  // Update icon when type changes if current icon is not in the new list
  const handleTypeChange = (newType: TransactionType) => {
    setType(newType);
    const newAvailableIcons = newType === 'income' ? INCOME_ICONS : EXPENSE_ICONS;
    if (!newAvailableIcons.includes(icon)) {
      setIcon(newAvailableIcons[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      return;
    }

    onSave({ name: name.trim(), type, color, icon });

    // Reset form
    setName('');
    setType('expense');
    setColor(AVAILABLE_COLORS[0]);
    setIcon(EXPENSE_ICONS[0]);
    onClose();
  };

  const getIconComponent = (iconName: string) => {
    const IconComponent = (LucideIcons as any)[iconName];
    return IconComponent ? <IconComponent className="h-5 w-5" /> : null;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{t('categories.newCategory')}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <div className="flex items-center gap-2">
                <Type className="h-4 w-4" />
                {t('categories.categoryName')}
              </div>
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t('categories.categoryNamePlaceholder')}
              required
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          {/* Type Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <div className="flex items-center gap-2">
                <TagIcon className="h-4 w-4" />
                {t('categories.type')}
              </div>
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => handleTypeChange('income')}
                className={`py-3 px-4 rounded-lg font-medium transition-all ${
                  type === 'income'
                    ? 'bg-green-500 text-white shadow-md'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {t('transactions.income')}
              </button>
              <button
                type="button"
                onClick={() => handleTypeChange('expense')}
                className={`py-3 px-4 rounded-lg font-medium transition-all ${
                  type === 'expense'
                    ? 'bg-red-500 text-white shadow-md'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {t('transactions.expense')}
              </button>
            </div>
          </div>

          {/* Color Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <div className="flex items-center gap-2">
                <Palette className="h-4 w-4" />
                {t('categories.color')}
              </div>
            </label>
            <div className="grid grid-cols-5 gap-2">
              {AVAILABLE_COLORS.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setColor(c)}
                  className={`h-10 rounded-lg transition-all ${
                    color === c ? 'ring-2 ring-offset-2 ring-primary-500 dark:ring-offset-gray-800' : ''
                  }`}
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
          </div>

          {/* Icon Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {t('categories.icon')}
            </label>
            <div className="grid grid-cols-5 gap-2">
              {availableIcons.map((iconName) => {
                const IconComponent = (LucideIcons as any)[iconName];
                return (
                  <button
                    key={iconName}
                    type="button"
                    onClick={() => setIcon(iconName)}
                    className={`h-12 rounded-lg flex items-center justify-center transition-all ${
                      icon === iconName
                        ? 'bg-primary-100 dark:bg-primary-900/30 ring-2 ring-primary-500'
                        : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                    title={t(`categories.icons.${iconName}`)}
                  >
                    {IconComponent && <IconComponent className="h-5 w-5 text-gray-700 dark:text-gray-300" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Preview */}
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{t('categories.preview')}</p>
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-semibold"
                style={{ backgroundColor: color }}
              >
                {getIconComponent(icon) || name.charAt(0).toUpperCase() || '?'}
              </div>
              <span className="text-gray-900 dark:text-white font-medium">
                {name || t('categories.categoryNameDefault')}
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium"
            >
              {t('common.cancel')}
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-primary-600 dark:bg-primary-500 text-white rounded-lg hover:bg-primary-700 dark:hover:bg-primary-600 transition-colors font-medium"
            >
              {t('categories.createCategory')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
