# 🤖 Documentación del Proyecto - CirculApp

## 📋 Tabla de Contenidos

- [🌟 Arquitectura Frontend](#-arquitectura-frontend)  
- [📁 Estructura de Directorios](#-estructura-de-directorios)  
- [🧩 Components](#-components)  
- [🌐 Context](#-context)  
- [🪝 Hooks](#-hooks)  
- [📄 Pages](#-pages)  
- [⚙️ Services](#️-services)  
- [🛠️ Utils](#️-utils)  

---

## 🌟 Arquitectura Frontend

El **frontend de CirculApp** está construido en **React** y sigue una arquitectura modular inspirada en el patrón **MVC**:  

- **Modelo (Services & Utils)** → Manejo de datos, APIs y utilidades.  
- **Vista (Components & Pages)** → Representación de la interfaz de usuario.  
- **Controlador (Hooks & Context)** → Gestión de estado, lógica de negocio y comunicación entre capas.  

Esto permite un **código mantenible, escalable y reutilizable**, ideal para proyectos en crecimiento.  

---

## 📁 Estructura de Directorios

```
frontend/
├── src/
│ ├── components/ # Componentes reutilizables
│ ├── context/ # Contextos globales
│ ├── hooks/ # Custom hooks
│ ├── pages/ # Páginas principales
│ ├── services/ # Llamadas a APIs
│ ├── utils/ # Funciones utilitarias
│ ├── App.css
│ ├── App.js
│ ├── App.test.js
│ ├── index.css
│ ├── index.js
│ ├── logo.svg
│ ├── reportWebVitals.js
│ └── setupTests.js

```

---

## 🧩 Components

### 🔑 Auth
- *(pendiente de implementación)*

### 💬 Chat
- *(pendiente de implementación)*

### ⚙️ Common
- `EmptyState.js` → Estado vacío genérico.  
- `ErrorBoundary.js` → Manejo de errores en UI.  
- `ErrorRetry.js` → Componente para reintentos tras error.  
- `Footer.js` → Pie de página de la app.  
- `InfiniteScroll.js` → Renderizado infinito de listas.  
- `LazyImage.js` → Carga diferida de imágenes.  
- `LoadingSpinner.js` → Indicador de carga.  
- `Navbar.js` → Barra de navegación principal.  
- `SearchInput.js` → Input con búsqueda en vivo.  
- `VirtualizedList.js` → Listado optimizado para grandes volúmenes de datos.  

### 📝 Forms
- `FormField.js` → Campo de formulario reutilizable.  

### 🛒 Products
- *(pendiente de implementación)*

### 🔍 SEO
- `MetaTags.js` → Manejo de etiquetas meta dinámicas.  

---

## 🌐 Context

- `AppContext.js` → Contexto general de la aplicación.  
- `AuthContext.js` → Manejo de autenticación y sesión.  
- `NotificationContext.js` → Manejo global de notificaciones.  

---

## 🪝 Hooks

- `performance.js` → Herramientas de optimización.  
- `useAnalytics.js` → Seguimiento de eventos y métricas.  
- `useDebounce.js` → Debounce para inputs y acciones.  
- `useGeolocation.js` → Geolocalización del usuario.  
- `useImageUpload.js` → Manejo de carga de imágenes.  
- `useInfiniteScroll.js` → Scroll infinito.  
- `useLocalStorage.js` → Persistencia en localStorage.  
- `usePageTracking.js` → Seguimiento de navegación.  
- `useProducts.js` → Hook para productos.  
- `useTheme.js` → Cambio y persistencia de tema (dark/light).  

---

## 📄 Pages

- **Admin**  
  - `AdminPanel.js` → Panel de administración.  

- **Auth**  
  - `Login.js` → Página de inicio de sesión.  
  - `Register.js` → Registro de usuario.  

- **Generales**  
  - `Chats.js` → Página de chats.  
  - `CreateProduct.js` → Creación de productos.  
  - `Dashboard.js` → Panel principal del usuario.  
  - `Home.js / Home.css` → Página de inicio.  
  - `ProductDetails.js` → Detalle de producto.  
  - `Products.js` → Listado de productos.  
  - `Profile.js` → Perfil del usuario.  

---

## ⚙️ Services

- `api.js` → Configuración principal de Axios/Fetch.  
- `index.js` → Exportaciones de servicios.  

---

## 🛠️ Utils

- `constants.js` → Definición de constantes globales.  
- `formatters.js` → Funciones para formatear datos (moneda, fecha, etc).  
- `image.js` → Utilidades para manejo de imágenes.  
- `location.js` → Herramientas de ubicación.  
- `storage.js` → Utilidades para almacenamiento local/session.  
