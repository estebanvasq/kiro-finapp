import { useMemo } from 'react';
import { mockTransactions } from '@/data/mockData';
import { useCategories } from '@/context/CategoryContext';
import { useTheme } from '@/context/ThemeContext';
import StatCard from '@/components/StatCard';
import TransactionList from '@/components/TransactionList';
import { Wallet, TrendingUp, TrendingDown, PiggyBank, PieChart as PieChartIcon, Clock } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { useTranslation } from 'react-i18next';
import { getCategoryName } from '@/utils/categoryHelpers';

export default function Dashboard() {
  const { categories } = useCategories();
  const { theme } = useTheme();
  const { t } = useTranslation();
  const stats = useMemo(() => {
    const income = mockTransactions
      .filter((t) => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
    
    const expenses = mockTransactions
      .filter((t) => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
    
    const balance = income - expenses;
    const savings = balance > 0 ? balance : 0;

    return { income, expenses, balance, savings };
  }, []);

  const expensesByCategory = useMemo(() => {
    const categoryMap = new Map<string, number>();
    
    mockTransactions
      .filter((t) => t.type === 'expense')
      .forEach((t) => {
        const current = categoryMap.get(t.category) || 0;
        categoryMap.set(t.category, current + t.amount);
      });

    const total = Array.from(categoryMap.values()).reduce((sum, val) => sum + val, 0);

    return Array.from(categoryMap.entries()).map(([name, value]) => {
      const category = categories.find((c) => c.name === name);
      const percentage = total > 0 ? ((value / total) * 100).toFixed(1) : '0';
      return {
        name: category ? getCategoryName(category, t) : name,
        value,
        percentage,
        color: category?.color || '#6b7280',
      };
    });
  }, [categories, t]);

  const recentTransactions = useMemo(() => {
    return [...mockTransactions]
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 5);
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{t('dashboard.title')}</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">{t('dashboard.subtitle', { defaultValue: 'Resumen de tus finanzas personales' })}</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title={t('dashboard.totalBalance')}
          value={stats.balance}
          icon={Wallet}
          color="primary"
          trend={{ value: 12, isPositive: true }}
        />
        <StatCard
          title={t('dashboard.income')}
          value={stats.income}
          icon={TrendingUp}
          color="green"
        />
        <StatCard
          title={t('dashboard.expenses')}
          value={stats.expenses}
          icon={TrendingDown}
          color="red"
        />
        <StatCard
          title={t('dashboard.savings', { defaultValue: 'Ahorros' })}
          value={stats.savings}
          icon={PiggyBank}
          color="purple"
        />
      </div>

      {/* Charts and Recent Transactions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Expense Chart */}
        <div className="card">
          <div className="flex items-center gap-2 mb-4">
            <PieChartIcon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{t('dashboard.expensesByCategory', { defaultValue: 'Gastos por Categoría' })}</h2>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={expensesByCategory}
                cx="50%"
                cy="50%"
                labelLine={true}
                label={(entry) => `${entry.percentage}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                stroke={theme === 'dark' ? '#1f2937' : '#ffffff'}
                strokeWidth={2}
              >
                {expensesByCategory.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value: number) => `€${value.toFixed(2)}`}
                contentStyle={{
                  backgroundColor: theme === 'dark' ? '#111827' : '#ffffff',
                  border: `2px solid ${theme === 'dark' ? '#4b5563' : '#d1d5db'}`,
                  borderRadius: '0.5rem',
                  color: theme === 'dark' ? '#ffffff' : '#111827',
                  boxShadow: theme === 'dark' 
                    ? '0 10px 15px -3px rgba(0, 0, 0, 0.5), 0 4px 6px -2px rgba(0, 0, 0, 0.3)' 
                    : '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                  padding: '12px 16px',
                  fontWeight: '500'
                }}
                labelStyle={{
                  color: theme === 'dark' ? '#ffffff' : '#111827',
                  fontWeight: '600',
                  marginBottom: '4px'
                }}
                itemStyle={{
                  color: theme === 'dark' ? '#e5e7eb' : '#374151'
                }}
              />
              <Legend 
                wrapperStyle={{
                  color: theme === 'dark' ? '#f9fafb' : '#111827'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Recent Transactions */}
        <div className="card">
          <div className="flex items-center gap-2 mb-4">
            <Clock className="h-5 w-5 text-gray-600 dark:text-gray-400" />
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{t('dashboard.recentTransactions')}</h2>
          </div>
          <TransactionList transactions={recentTransactions} />
        </div>
      </div>
    </div>
  );
}
