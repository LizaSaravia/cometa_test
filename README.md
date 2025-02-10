# Bar Orders & Payment API

¡Bienvenido a **Bar Orders & Payment API**!  
Esta aplicación simula la gestión de órdenes y pagos en un bar que vende cerveza. Está diseñada con una arquitectura limpia y separada: un **backend** en FastAPI para procesar órdenes, calcular la cuenta y registrar pagos, y un **frontend** en Next.js (con TypeScript y Tailwind CSS) que proporciona una interfaz moderna y responsiva.

---

## Funcionalidades

### Backend (FastAPI)
- **Gestión de stock y promociones:**  
  - Se lleva un registro del stock de cervezas, incluyendo promociones.  
  - Ejemplo: "Corona" tiene la promoción **2x1**.

- **Recepción de órdenes:**  
  - Se pueden enviar órdenes mediante el endpoint `POST /order`.
  - Cada orden contiene el nombre del amigo (ahora: **Rodrigo**, **Ailen** y **Ornela**) y los ítems solicitados.
  - Al recibir la orden, el backend actualiza el stock automáticamente y asigna un `order_id` único.

- **Cálculo de la cuenta:**  
  - El endpoint `GET /bill` calcula el total a pagar en función de lo consumido por cada amigo.
  - Se incluye un desglose (breakdown) que indica cuánto debe pagar cada uno.

- **Registro de pagos:**  
  - El endpoint `POST /pay` permite registrar pagos individuales.

- **Listar cervezas disponibles:**  
  - Con `GET /beers` se obtiene la información actualizada del stock, precios y promociones.

### Frontend (Next.js + Tailwind CSS)
El frontend consta de varias páginas que te permiten interactuar con la API:

- **Landing Page (`/`):**  
  - Es la página principal que muestra un menú con tarjetas que enlazan a cada sección:
    - **Cerveza Disponible:** Lista las cervezas con stock, precios y promociones.
    - **Recibir Orden:** Permite enviar una orden indicando el amigo y los ítems que se desean.
    - **Obtener Cuenta:** Muestra la cuenta total y el desglose por amigo, según lo consumido.
    - **Pagar Cuenta:** Permite registrar un pago para cada amigo.

- **Beers (`/beers`):**  
  - Muestra la lista de cervezas disponibles junto con la fecha de última actualización.
  - Ejemplo de información:  
    - *Corona*: Precio 115, Stock 2, Promoción "2x1"  
    - *Club Colombia*: Precio 110, Stock 3

- **Order (`/order`):**  
  - Contiene un formulario para enviar órdenes.  
  - El formulario permite seleccionar al amigo (Rodrigo, Ailen o Ornela) y agregar uno o más ítems (nombre de la cerveza y cantidad).
  - Al enviar la orden, se actualizan automáticamente los campos (se reinician a 0) y el backend actualiza el stock en consecuencia.

- **Bill (`/bill`):**  
  - Muestra la cuenta generada a partir de las órdenes enviadas.
  - Se muestra el total a pagar y un desglose que indica cuánto debe pagar cada amigo según su consumo.

- **Payment (`/payment`):**  
  - Ofrece un formulario para registrar pagos.
  - Permite seleccionar al amigo y especificar el valor a pagar.
  - Incluye un mensaje de confirmación una vez que el pago se registra correctamente.
  - Además, en esta página y en las demás, hay un enlace "← Volver a Inicio" para facilitar la navegación.

- **Navegación:**  
  - Todas las páginas incluyen una **NavBar** en la parte superior, que muestra enlaces a:  
    - Inicio  
    - Cerveza  
    - Orden  
    - Cuenta  
    - Pago  

---

## Instalación y Ejecución

### Requisitos Previos
- **Backend:**  
  - Python 3.8 o superior.  
  - Dependencias: FastAPI, Uvicorn, Pydantic, etc.
- **Frontend:**  
  - Node.js (versión 14 o superior).  
  - Dependencias: Next.js, React, TypeScript, Tailwind CSS, etc.

### Pasos para levantar el Backend

1. Navega a la carpeta backend.
2. Instala las dependencias de Python:
   ```bash
   pip install -r requirements.txt
3. Levantar el servidor: uvicorn app.main:app --reload

### Pasos para levantar el Frontend

1. Navega a la carpeta frontend.
2. Instala las dependencias :
   ```bash
   npm install
3. Levantar el servidor: npm run dev

## Ejecución de Tests

### Backend
Desde la raíz del proyecto, ejecuta:
      pytest

### Frontend
Desde la carpeta frontend, ejecuta:
      npm run test