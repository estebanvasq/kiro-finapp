import { createContext, useContext, useState, ReactNode } from 'react';
import { Currency, CurrencyInfo } from '@/types';

export const CURRENCIES: Record<Currency, CurrencyInfo> = {
  EUR: {
    code: 'EUR',
    symbol: '€',
    locale: 'es-ES',
    name: 'Euro',
  },
  USD: {
    code: 'USD',
    symbol: '$',
    locale: 'en-US',
    name: 'US Dollar',
  },
};

interface CurrencyContextType {
  currency: Currency;
  currencyInfo: CurrencyInfo;
  setCurrency: (currency: Currency) => void;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrencyState] = useState<Currency>(() => {
    const saved = localStorage.getItem('currency') as Currency;
    return saved && saved in CURRENCIES ? saved : 'EUR';
  });

  const setCurrency = (newCurrency: Currency) => {
    setCurrencyState(newCurrency);
    localStorage.setItem('currency', newCurrency);
  };

  const currencyInfo = CURRENCIES[currency];

  return (
    <CurrencyContext.Provider value={{ currency, currencyInfo, setCurrency }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
}
