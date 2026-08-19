# Mobile Store

Aplicación móvil de comercio electrónico desarrollada con React Native y Expo. Consume Fake Store API para mostrar productos y permite consultar detalles, administrar un carrito y simular un proceso de compra.

## Funcionalidades

- Pantalla de bienvenida.
- Catálogo obtenido desde una API.
- Estados de carga y error.
- Detalle dinámico por producto.
- Carrito global sincronizado entre pantallas.
- Incremento y decremento de cantidades.
- Subtotal por producto y total general.
- Formulario de checkout con validaciones.
- Confirmación de compra y limpieza del carrito.

> El checkout es una simulación. No se procesa ningún pago ni se registra una orden real en la API.

## Tecnologías

- Expo SDK 54
- React Native 0.81
- TypeScript
- Expo Router
- TanStack Query
- Zustand
- Fake Store API

## Arquitectura

```text
app/          Pantallas y rutas de Expo Router
components/   Componentes visuales reutilizables
hooks/        Hooks para las consultas de TanStack Query
services/     Comunicación con la API
store/        Estado global del carrito
types/        Tipos de TypeScript
```

## Rutas

| Ruta | Pantalla |
| --- | --- |
| `/` | Bienvenida |
| `/catalog` | Catálogo |
| `/product/[id]` | Detalle dinámico |
| `/cart` | Carrito |
| `/checkout` | Formulario de compra |
| `/success` | Confirmación |

## Manejo del estado

El proyecto separa el estado según su origen:

- TanStack Query administra los productos recibidos desde la API, junto con sus estados de carga, error y caché.
- Zustand administra el estado local y global del carrito.
- `useState` administra los campos y mensajes del formulario de checkout.

El carrito almacena solamente la relación entre el identificador de un producto y su cantidad:

```ts
Record<number, number>
```

Los títulos y precios se obtienen desde TanStack Query. Los subtotales y el total se calculan como datos derivados para evitar duplicar información en el store.

## API

Los productos se obtienen desde:

```text
https://fakestoreapi.com/products
```

Endpoints utilizados:

```text
GET /products
GET /products/:id
```

## Instalación

Requisitos:

- Node.js 20.19 o posterior.
- npm.
- Expo Go, un emulador o un navegador.

Clona el repositorio:

```bash
git clone https://github.com/Marcelo-30/mobile-store-prueba.git
cd mobile-store-prueba
```

Instala las dependencias:

```bash
npm install
```

Inicia el proyecto:

```bash
npx expo start
```

## Scripts

```bash
npm start
npm run android
npm run ios
npm run web
npm run lint
```

## Decisiones técnicas

### Expo Router

Se utilizó navegación basada en archivos para relacionar la estructura de `app/` con las rutas de la aplicación.

### TanStack Query

Se utilizó para separar el estado remoto del estado local, reutilizar los productos almacenados en caché y manejar los estados de carga y error.

### Zustand

Se eligió por su API pequeña y directa para compartir las cantidades del carrito entre catálogo, detalle y carrito sin necesidad de un proveedor adicional.

### Componentes reutilizables

`ProductCard`, `QuantityControl` y `CartItem` separan responsabilidades y evitan repetir la misma lógica visual en diferentes pantallas.

## Mejoras futuras

- Persistir el carrito al cerrar la aplicación.
- Añadir pruebas automatizadas.
- Implementar búsqueda y filtrado.
- Conectar un servicio real de órdenes y pagos.
- Mejorar accesibilidad y retroalimentación visual.