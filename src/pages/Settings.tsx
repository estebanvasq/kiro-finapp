import { useState } from 'react';
import { mockUser } from '@/data/mockData';
import { User, Bell, Shield, Database, Tag, Plus, Trash2, Globe, Mail, UserCircle, Lock, Key } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { useCategories } from '@/context/CategoryContext';
import NewCategoryModal from '@/components/NewCategoryModal';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@/context/ThemeContext';
import { getCategoryName } from '@/utils/categoryHelpers';

export default function Settings() {
  const { categories, addCategory, deleteCategory } = useCategories();
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const { theme, setTheme } = useTheme();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const getCategoryIcon = (iconName?: string) => {
    if (!iconName) return null;
    const IconComponent = (LucideIcons as any)[iconName];
    return IconComponent ? <IconComponent className="h-4 w-4" /> : null;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{t('settings.title')}</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">{t('settings.subtitle')}</p>
      </div>

      {/* Language Settings */}
      <div className="card">
        <div className="flex items-center space-x-4 mb-6">
          <Globe className="h-5 w-5 text-gray-600 dark:text-gray-400" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{t('settings.language')}</h2>
        </div>
        <div className="space-y-4">
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => changeLanguage('es')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                i18n.language === 'es'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              Español
            </button>
            <button
              onClick={() => changeLanguage('en')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                i18n.language === 'en'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              English
            </button>
            <button
              onClick={() => changeLanguage('pt')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                i18n.language === 'pt'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              Português
            </button>
          </div>
        </div>
      </div>

      {/* Theme Settings */}
      <div className="card">
        <div className="flex items-center space-x-4 mb-6">
          <Shield className="h-5 w-5 text-gray-600 dark:text-gray-400" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{t('settings.theme')}</h2>
        </div>
        <div className="space-y-4">
          <div className="flex gap-3">
            <button
              onClick={() => setTheme('light')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                theme === 'light'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {t('settings.light')}
            </button>
            <button
              onClick={() => setTheme('dark')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                theme === 'dark'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {t('settings.dark')}
            </button>
          </div>
        </div>
      </div>

      {/* User Profile */}
      <div className="card">
        <div className="flex items-center space-x-4 mb-6">
          <UserCircle className="h-5 w-5 text-gray-600 dark:text-gray-400" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{t('settings.userProfile')}</h2>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                {t('settings.name')}
              </div>
            </label>
            <input
              type="text"
              defaultValue={mockUser.name}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                {t('settings.email')}
              </div>
            </label>
            <input
              type="email"
              defaultValue={mockUser.email}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          <button className="btn-primary">{t('settings.saveChanges')}</button>
        </div>
      </div>

      {/* Categories Management */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <Tag className="h-5 w-5 text-gray-600 dark:text-gray-400" />
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{t('settings.categories')}</h2>
          </div>
          <button
            onClick={() => setIsCategoryModalOpen(true)}
            className="btn-primary flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            {t('categories.newCategory')}
          </button>
        </div>
        
        <div className="space-y-4">
          {/* Income Categories */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">{t('dashboard.income')}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {categories.filter(cat => cat.type === 'income').map((cat) => (
                <div
                  key={cat.id}
                  className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm font-semibold"
                      style={{ backgroundColor: cat.color }}
                    >
                      {getCategoryIcon(cat.icon) || getCategoryName(cat, t).charAt(0)}
                    </div>
                    <span className="text-gray-900 dark:text-white font-medium">{getCategoryName(cat, t)}</span>
                  </div>
                  <button
                    onClick={() => deleteCategory(cat.id)}
                    className="text-gray-400 hover:text-red-500 transition-colors"
                    title={t('settings.deleteCategory')}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Expense Categories */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">{t('dashboard.expenses')}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {categories.filter(cat => cat.type === 'expense').map((cat) => (
                <div
                  key={cat.id}
                  className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm font-semibold"
                      style={{ backgroundColor: cat.color }}
                    >
                      {getCategoryIcon(cat.icon) || getCategoryName(cat, t).charAt(0)}
                    </div>
                    <span className="text-gray-900 dark:text-white font-medium">{getCategoryName(cat, t)}</span>
                  </div>
                  <button
                    onClick={() => deleteCategory(cat.id)}
                    className="text-gray-400 hover:text-red-500 transition-colors"
                    title={t('settings.deleteCategory')}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="card">
        <div className="flex items-center space-x-4 mb-6">
          <Bell className="h-5 w-5 text-gray-600 dark:text-gray-400" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{t('settings.notifications')}</h2>
        </div>
        <div className="space-y-4">
          <label className="flex items-center justify-between">
            <span className="text-gray-700 dark:text-gray-300">{t('settings.budgetAlerts')}</span>
            <input type="checkbox" defaultChecked className="h-5 w-5 text-primary-600 rounded" />
          </label>
          <label className="flex items-center justify-between">
            <span className="text-gray-700 dark:text-gray-300">{t('settings.monthlySummary')}</span>
            <input type="checkbox" defaultChecked className="h-5 w-5 text-primary-600 rounded" />
          </label>
          <label className="flex items-center justify-between">
            <span className="text-gray-700 dark:text-gray-300">{t('settings.paymentReminders')}</span>
            <input type="checkbox" className="h-5 w-5 text-primary-600 rounded" />
          </label>
        </div>
      </div>

      {/* Security */}
      <div className="card">
        <div className="flex items-center space-x-4 mb-6">
          <Lock className="h-5 w-5 text-gray-600 dark:text-gray-400" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{t('settings.security')}</h2>
        </div>
        <div className="flex flex-wrap gap-3">
          <button className="btn-secondary flex items-center gap-2">
            <Key className="h-4 w-4" />
            {t('settings.changePassword')}
          </button>
          <button className="btn-secondary flex items-center gap-2">
            <Shield className="h-4 w-4" />
            {t('settings.twoFactorAuth')}
          </button>
        </div>
      </div>

      {/* Database Integration */}
      <div className="card bg-primary-50 dark:bg-primary-900/20 border-primary-200 dark:border-primary-800">
        <div className="flex items-center space-x-4 mb-4">
          <Database className="h-5 w-5 text-primary-600 dark:text-primary-400" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{t('settings.supabaseIntegration')}</h2>
        </div>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          {t('settings.supabaseDescription')}
        </p>
        <button className="btn-primary" disabled>
          {t('settings.connectSupabase')}
        </button>
      </div>

      {/* New Category Modal */}
      <NewCategoryModal
        isOpen={isCategoryModalOpen}
        onClose={() => setIsCategoryModalOpen(false)}
        onSave={addCategory}
      />
    </div>
  );
}
