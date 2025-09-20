# 🤖 Documentación del Proyecto - CirculApp

## 📋 Tabla de Contenidos

- [🌟 Arquitectura Backend](#-arquitectura-backend)
- [📁 Estructura de Directorios](#-estructura-de-directorios)
- [⚙️ Configuración](#️-configuración)
- [🛡️ Middleware](#️-middleware)
- [🗄️ Modelos de Datos](#️-modelos-de-datos)
- [🛤️ Rutas y Endpoints](#️-rutas-y-endpoints)
- [🔧 Scripts y Utilidades](#-scripts-y-utilidades)
- [🚨 Códigos de Error](#-códigos-de-error)

---

## 🌟 Arquitectura Backend

El backend de CirculApp está estructurado siguiendo el patrón MVC (Modelo-Vista-Controlador) con una arquitectura modular que separa las responsabilidades en diferentes capas.

---

## 📁 Estructura de Directorios

```
backend/
├── config/
├── middleware/
├── models/
├── routes/
├── scripts/
├── services/
├── socket/
├── test/
├── utils/
└── server.js
```

---

## ⚙️ Configuración

### `/config`

| Archivo | Descripción |
|---------|-------------|
| `database.js` | Configuración y conexión a MongoDB |
| `redis.js` | Configuración del servidor Redis para caché |

---

## 🛡️ Middleware

Funciones que se ejecutan antes o entre las peticiones HTTP.

### `/middleware`

| Archivo | Función | Descripción |
|---------|---------|-------------|
| `admin.js` | Autorización | Valida permisos de administrador, maneja errores 403 y 500 |
| `auth.js` | Autenticación | Gestión de tokens JWT y autenticación de usuarios |
| `errorHandler.js` | Manejo de errores | Procesamiento centralizado de errores de MongoDB |
| `materialValidation.js` | Validación | ⚠️ **Archivo vacío - pendiente implementación** |
| `security.js` | Seguridad | Medidas de seguridad general de la aplicación |
| `upload.js` | Carga de archivos | Configuración de Cloudinary y validación de formatos |

---

## 🗄️ Modelos de Datos

Esquemas de la base de datos MongoDB.

### `/models`

| Modelo | Descripción |
|--------|-------------|
| `chat.js` | Mensajes y conversaciones del chat |
| `collectionSchedule.js` | Horarios de recolección de materiales |
| `Material.js` | Tipos de materiales reciclables |
| `Product.js` | Productos disponibles en la plataforma |
| `Report.js` | Reportes y denuncias de usuarios |
| `Review.js` | Reseñas y calificaciones |
| `Transaction.js` | Transacciones y intercambios |
| `User.js` | Datos de usuarios del sistema |

---

## 🛤️ Rutas y Endpoints

Definición de las rutas de la API REST.

### `/routes`

| Archivo | Endpoints | Descripción |
|---------|-----------|-------------|
| `admin.js` | `/admin/*` | Gestión administrativa |
| `auth.js` | `/auth/*` | Autenticación y autorización |
| `chat.js` | `/chat/*` | Sistema de mensajería |
| `material.js` | `/materials/*` | Gestión de materiales |
| `municipal.js` | `/municipal/*` | Servicios municipales |
| `products.js` | `/products/*` | Catálogo de productos |
| `reviews.js` | `/reviews/*` | Sistema de reseñas |
| `users.js` | `/users/*` | Gestión de usuarios |

---

## 🔧 Scripts y Utilidades

### `/scripts`
- `migrate.js` - Scripts de migración de base de datos
- `seed.js` - Datos iniciales para desarrollo

### `/services`
- `aiValidation.js` - Validación mediante inteligencia artificial
- `routeOptimizacion.js` - Optimización de rutas de recolección

### `/socket`
- `chatSocket.js` - Comunicación en tiempo real para el chat

### `/test`
- `integration/municipal.test.js` - Pruebas de integración
- `performance/auth.test.js` - Pruebas de rendimiento

### `/utils`
- `emailService.js` - Servicio de envío de correos electrónicos
- `logger.js` - Sistema de logging de la aplicación

---

## 🚨 Códigos de Error

### Error 400 - Bad Request
**Archivos:** `middleware/errorHandler.js`, `middleware/security.js`

- 'Error de validación'
- 'Datos de entrada inválidos'
- 'Formato de ID inválido'
- 'Token inválido'
- 'Archivo demasiado grande'
- 'Tipo de archivo no permitido'
- 'Nombre de archivo inválido'

### Error 401 - Unauthorized
**Archivos:** `middleware/auth.js`, `middleware/errorHandler.js`, `middleware/security.js`, `routes/auth.js`

- 'Token no proporcionado'
- 'Usuario no válido'
- 'Usuario no encontrado'
- 'Cuenta desactivada'
- 'Token expirado'
- 'Token inválido'
- 'Credenciales inválidas'
- 'El archivo es demasiado grande'
- 'Error en la carga del archivo'

### Error 403 - Forbidden
**Archivos:** `middleware/admin.js`, `middleware/security.js`

- 'Acceso denegado. Se requieren permisos de administrador'
- 'CSRF Token inválido'

### Error 404 - Not Found
- 'Usuario no encontrado'
- 'Producto no encontrado'

### Error 409 - Conflict
**Archivos:** `middleware/errorHandler.js`

- 'El ${field} ya está en uso'

### Error 429 - Too Many Requests
**Archivos:** `middleware/security.js`

- 'Demasiadas solicitudes'

### Error 500 - Internal Server Error
**Archivos:** `middleware/admin.js`, `middleware/errorHandler.js`, `routes/admin.js`, y todos los archivos de rutas

- 'Error interno del servidor'

---

## 📝 Notas Adicionales

- ⚠️ El archivo `materialValidation.js` está marcado como vacío y requiere implementación
- 🔄 Todos los archivos de rutas pueden generar errores 500 en caso de fallos internos
- 🛡️ El sistema implementa múltiples capas de seguridad y validación
- 📊 Se incluyen pruebas tanto de integración como de rendimiento