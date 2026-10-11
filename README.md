# Germen Latin Market - Frontend

Frontend de la aplicación web **Germen Latin Market**, desarrollada con React y Vite como parte del proyecto final Fullstack.

## Descripción

Germen Latin Market es una tienda online orientada a la venta de productos latinoamericanos y africanos, con productos enviados desde España a Turquía y Europa.

La aplicación permite:

- Visualizar productos disponibles.
- Consultar productos por categoría.
- Ver el detalle de cada producto.
- Añadir productos al carrito.
- Gestionar cantidades y eliminar productos.
- Realizar pedidos.
- Iniciar sesión con diferentes roles.
- Acceder a un panel de administración.
- Crear, editar y eliminar productos.
- Gestionar pedidos desde el área administrativa.

## Tecnologías

- React
- Vite
- JavaScript
- Tailwind CSS
- React Router
- API REST con Node.js y Express
- MongoDB Atlas

## Arquitectura

El frontend consume una API REST independiente desarrollada con Node.js y Express.
La URL de la API se configura mediante la variable de entorno:

```env
VITE_API_URL=

#Instalación
npm install

Ejecución en desarrollo
npm run dev

Compilación para producción
npm run build

Estructura principal
src/
├── components/
├── context/
├── data/
├── hooks/
├── layouts/
├── pages/
├── services/
└── App.jsx


## Diagrama de arquitectura

```mermaid
flowchart TD
    A[Usuario] --> B[Frontend React + Vite]

    B --> C[React Router]
    B --> D[Context API]
    B --> E[Servicios HTTP]

    E --> F[API REST Express / Node.js]

    F --> G[Middleware JWT]
    F --> H[Controladores]

    H --> I[Mongoose]
    I --> J[(MongoDB Atlas)]

    G --> K[Rol Customer]
    G --> L[Rol Admin]

    L --> M[CRUD de productos]
    L --> N[Gestión de pedidos]

    K --> O[Carrito y Checkout]
    O --> N
    
Despliegue
El frontend está preparado para desplegarse en Vercel y conectarse al backend mediante la variable VITE_API_URL.
Proyecto académico
Proyecto final Fullstack desarrollado como aplicación de comercio electrónico completa, integrando frontend, backend y base de datos.
Germen Latin Market
Sabores que te llevan a casa.