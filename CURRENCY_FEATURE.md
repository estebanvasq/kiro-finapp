# Funcionalidad Multi-Moneda

## Descripción
La aplicación ahora soporta múltiples monedas. Los usuarios pueden seleccionar su moneda preferida desde la página de Configuración.

## Monedas Soportadas
- **EUR (Euro)**: Moneda por defecto
- **USD (Dólar Americano)**

## Implementación

### Contexto de Moneda
Se creó un nuevo contexto `CurrencyContext` que:
- Almacena la moneda seleccionada en `localStorage`
- Proporciona información de la moneda (código, símbolo, locale, nombre)
- Permite cambiar la moneda dinámicamente

### Hook Personalizado
`useCurrencyFormatter` simplifica el formateo de moneda:
```typescript
const { format } = useCurrencyFormatter();
const formattedAmount = format(1234.56); // €1.234,56 o $1,234.56
```

### Componentes Actualizados
- `StatCard`: Muestra valores con la moneda seleccionada
- `TransactionList`: Formatea transacciones con la moneda actual
- `Budgets`: Muestra presupuestos en la moneda seleccionada
- `Settings`: Incluye selector de moneda

### Archivos Creados/Modificados
- `src/context/CurrencyContext.tsx` (nuevo)
- `src/hooks/useCurrencyFormatter.ts` (nuevo)
- `src/types/index.ts` (actualizado con tipos Currency y CurrencyInfo)
- `src/utils/formatters.ts` (actualizado para aceptar parámetros de moneda)
- `src/App.tsx` (agregado CurrencyProvider)
- Archivos de traducción (agregada clave "settings.currency")

## Cómo Agregar Más Monedas

Para agregar una nueva moneda, edita `src/context/CurrencyContext.tsx`:

```typescript
export const CURRENCIES: Record<Currency, CurrencyInfo> = {
  EUR: { code: 'EUR', symbol: '€', locale: 'es-ES', name: 'Euro' },
  USD: { code: 'USD', symbol: '$', locale: 'en-US', name: 'US Dollar' },
  GBP: { code: 'GBP', symbol: '£', locale: 'en-GB', name: 'British Pound' }, // Nueva moneda
};
```

Y actualiza el tipo en `src/types/index.ts`:
```typescript
export type Currency = 'EUR' | 'USD' | 'GBP';
```

## Persistencia
La moneda seleccionada se guarda en `localStorage` con la clave `'currency'` y persiste entre sesiones.
