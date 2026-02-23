# Finanzas Personales

Aplicación moderna de gestión de finanzas personales construida con React, TypeScript y TailwindCSS. Diseño minimalista y responsive, preparada para integración con Supabase.

## Características

- 📊 Dashboard con resumen financiero y gráficos
- 💰 Gestión de transacciones (ingresos y gastos)
- 🎯 Control de presupuestos por categoría
- 📱 Diseño responsive para todos los dispositivos
- 🎨 Interfaz minimalista y moderna
- 🔮 Preparada para integración con Supabase

## Tecnologías

- **React 18** - Framework UI
- **TypeScript** - Tipado estático
- **Vite** - Build tool ultrarrápido
- **TailwindCSS** - Estilos utility-first
- **React Router** - Navegación
- **Recharts** - Gráficos y visualizaciones
- **Lucide React** - Iconos modernos

## Instalación

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Compilar para producción
npm run build

# Vista previa de producción
npm run preview
```

## Estructura del Proyecto

```
src/
├── components/      # Componentes reutilizables
│   ├── Layout.tsx
│   ├── StatCard.tsx
│   └── TransactionList.tsx
├── pages/          # Páginas principales
│   ├── Dashboard.tsx
│   ├── Transactions.tsx
│   ├── Budgets.tsx
│   └── Settings.tsx
├── data/           # Datos mockeados
│   └── mockData.ts
├── types/          # Definiciones TypeScript
│   └── index.ts
├── utils/          # Utilidades
│   └── formatters.ts
├── styles/         # Estilos globales
│   └── index.css
├── App.tsx
└── main.tsx
```

## Datos Mockeados

La aplicación actualmente utiliza datos de ejemplo para demostración. Los datos incluyen:

- Transacciones de ingresos y gastos
- Categorías predefinidas
- Presupuestos mensuales
- Usuario de ejemplo

## Próximos Pasos

### Integración con Supabase

1. Crear proyecto en [Supabase](https://supabase.com)
2. Configurar tablas:
   - `users` - Usuarios
   - `transactions` - Transacciones
   - `categories` - Categorías
   - `budgets` - Presupuestos
3. Instalar cliente de Supabase: `npm install @supabase/supabase-js`
4. Configurar variables de entorno
5. Implementar servicios de autenticación y CRUD

### Funcionalidades Futuras

- Autenticación de usuarios
- Sincronización en tiempo real
- Exportación de datos (CSV, PDF)
- Gráficos avanzados y reportes
- Modo oscuro
- Múltiples monedas
- Recordatorios y notificaciones

## Compatibilidad

- ✅ Chrome, Firefox, Safari, Edge (últimas versiones)
- ✅ Responsive: móvil, tablet, desktop
- ✅ Accesibilidad básica implementada

## Licencia

MIT
