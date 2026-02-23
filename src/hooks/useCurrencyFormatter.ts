import { useCurrency } from '@/context/CurrencyContext';
import { formatCurrency } from '@/utils/formatters';

export function useCurrencyFormatter() {
  const { currencyInfo } = useCurrency();

  const format = (amount: number): string => {
    return formatCurrency(amount, currencyInfo.code, currencyInfo.locale);
  };

  return { format, currencyInfo };
}
