import { Category } from '@/types';
import { TFunction } from 'i18next';

export function getCategoryName(category: Category, t: TFunction): string {
  if (category.translationKey) {
    return t(category.translationKey);
  }
  return category.name;
}
