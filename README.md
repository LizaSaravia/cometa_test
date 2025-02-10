# Bar Orders & Payment API

¡Bienvenido a **Bar Orders & Payment API**!  
Esta aplicación simula la gestión de órdenes y pagos en un bar donde solo se vende cerveza. Está diseñada con una arquitectura limpia y escalable, utilizando **FastAPI** en el backend y **Next.js** con **TypeScript** y **Tailwind CSS** en el frontend.

## Características

- **Gestión de stock y promociones:**  
  Actualiza el stock de cerveza en tiempo real. Incluye promociones (por ejemplo, 2x1 en Corona) para que, al realizar una orden, se aplique la promoción automáticamente.

- **Órdenes personalizadas:**  
  Permite recibir órdenes de los amigos (ahora: **Rodrigo**, **Ailen** y **Ornela**). La cuenta se calcula según lo que cada uno consume.

- **Registro de pagos:**  
  Cada amigo puede pagar lo que consumió. La aplicación registra los pagos de forma individual.

- **Interfaz moderna y amigable:**  
  La UI está diseñada con **Tailwind CSS** para ofrecer una experiencia de usuario atractiva y responsiva.
  
- **Pruebas unitarias:**  
  Se han incluido tests en el backend para garantizar la robustez y calidad de los endpoints.

## Endpoints del API (Backend)

- **GET /beers**  
  Lista la cerveza disponible (incluyendo stock y promociones).  
  **Ejemplo de respuesta:**
  ```json
  {
    "last_updated": "2024-09-10 12:00:00",
    "beers": [
      {"name": "Corona", "price": 115, "quantity": 2, "promotion": "2x1"},
      {"name": "Quilmes", "price": 120, "quantity": 0},
      {"name": "Club Colombia", "price": 110, "quantity": 3}
    ]
  }
