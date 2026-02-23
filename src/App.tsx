import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@/context/ThemeContext';
import { CategoryProvider } from '@/context/CategoryContext';
import { BudgetProvider } from '@/context/BudgetContext';
import Layout from '@/components/Layout';
import Dashboard from '@/pages/Dashboard';
import Transactions from '@/pages/Transactions';
import Budgets from '@/pages/Budgets';
import Settings from '@/pages/Settings';

function App() {
  return (
    <ThemeProvider>
      <CategoryProvider>
        <BudgetProvider>
          <BrowserRouter>
            <Layout>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/transactions" element={<Transactions />} />
                <Route path="/budgets" element={<Budgets />} />
                <Route path="/settings" element={<Settings />} />
              </Routes>
            </Layout>
          </BrowserRouter>
        </BudgetProvider>
      </CategoryProvider>
    </ThemeProvider>
  );
}

export default App;
