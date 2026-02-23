# Sistema de Internacionalización (i18n)

Esta aplicación utiliza `react-i18next` para soporte multiidioma.

## Idiomas Soportados

- Español (es) - Idioma por defecto
- Inglés (en)
- Portugués (pt)

## Estructura de Archivos

```
src/i18n/
├── config.ts          # Configuración de i18next
├── locales/
│   ├── es.json       # Traducciones en español
│   ├── en.json       # Traducciones en inglés
│   └── pt.json       # Traducciones en portugués
└── README.md         # Este archivo
```

## Uso en Componentes

### Importar el hook

```tsx
import { useTranslation } from 'react-i18next';
```

### Usar traducciones

```tsx
function MyComponent() {
  const { t } = useTranslation();
  
  return (
    <div>
      <h1>{t('dashboard.title')}</h1>
      <p>{t('dashboard.totalBalance')}</p>
    </div>
  );
}
```

### Cambiar idioma

```tsx
function LanguageSelector() {
  const { i18n } = useTranslation();
  
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };
  
  return (
    <button onClick={() => changeLanguage('en')}>
      English
    </button>
  );
}
```

## Agregar Nuevas Traducciones

1. Abre los archivos en `src/i18n/locales/`
2. Agrega la nueva clave en todos los idiomas:

```json
{
  "mySection": {
    "myKey": "Mi traducción"
  }
}
```

3. Usa la traducción en tu componente:

```tsx
{t('mySection.myKey')}
```

## Detección Automática de Idioma

El sistema detecta automáticamente el idioma del navegador del usuario. Si no está disponible, usa español como idioma por defecto.

## Persistencia

El idioma seleccionado se guarda automáticamente en `localStorage` y se restaura en la próxima visita.
