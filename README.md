# 🍻 Bar Orders & Payment API
¡Bienvenido a Bar Orders & Payment API! 🎯
Esta aplicación simula la gestión de órdenes y pagos en un bar que vende cerveza.

### 🔥 ¿Qué hace esta app?
✅ Recibe órdenes de clientes (por ahora, Rodrigo, Ailen y Ornela).
✅ Gestiona el stock de cervezas disponibles, incluyendo promociones como 2x1 en Corona.
✅ Calcula la cuenta, mostrando cuánto debe pagar cada amigo según su consumo.
✅ Divide la cuenta de dos formas:

🔹 Cada quien paga lo que consumió
🔹 División equitativa entre los tres amigos
✅ Registra pagos realizados por cada amigo.


## 🚀 Tecnologías Utilizadas
### 🖥 Backend - FastAPI
- API rápida y eficiente 🚀
- Arquitectura limpia con capas separadas:
  - Servicios (services/) -> Lógica de negocio.
  - Repositorios (repositories/) -> Acceso a datos.
  - Modelos (models/) -> Definición de estructura de datos.
- Manejo de stock y promociones dinámico.
- Endpoints RESTful bien estructurados.
- CORS habilitado para comunicación con el frontend.
### 🎨 Frontend - Next.js + TypeScript + TailwindCSS
- Interfaz moderna y responsiva con TailwindCSS.
- Páginas organizadas en /pages/, siguiendo la convención de Next.js.
- Consumo de API en cada página para obtener datos en tiempo real.
- Pruebas con Jest y Testing Library para garantizar estabilidad.


## 🎯 Funcionalidades de la App
### 🍺 Lista de Cervezas (/beers)
📢 Muestra la cerveza disponible, con su precio, stock y promociones.
Ejemplo:
```
Corona - $115 - Stock: 2 - Promo: 2x1
Club Colombia - $110 - Stock: 3 - Sin promoción
```
### 📝 Realizar una Orden (/order)
- Selecciona un amigo (Rodrigo, Ailen u Ornela).
- Añade una o más cervezas con su cantidad.
- Envía la orden y se actualiza el stock automáticamente.
### 💰 Ver la Cuenta (/bill)
- Total a pagar por todos los amigos.
- Desglose por persona, mostrando cuánto debe pagar cada uno.
- Opción de dividir la cuenta en partes iguales.
Ejemplo:
```
Total: $230
Rodrigo: $115
Ailen: $115
División equitativa: Cada uno paga $76.67
```
### 💳 Realizar un Pago (/payment)
- Selecciona un amigo y monto a pagar.
- Registra el pago y actualiza el estado de la cuenta.
- Mensaje de confirmación tras el pago exitoso.

## ⚙️ Instalación y Ejecución
### 📌 Requisitos Previos
#### 📍 Backend
- Python 3.8 o superior.
- Instalar dependencias con FastAPI, Uvicorn, Pydantic, etc.
#### 📍 Frontend
- Node.js (versión 14 o superior).
- Instalar dependencias con Next.js, React, TypeScript, Tailwind CSS, etc.

### 🔧 Levantar el Backend
1.  Navega a la carpeta del backend:
```
cd backend
```
2. Instala las dependencias de Python:
```
pip install -r requirements.txt
```
3. Inicia el servidor en modo desarrollo:
```
uvicorn app.main:app --reload
```
4. Listo! El backend estará disponible en http://localhost:8000.

### 🌐 Levantar el Frontend
1. Navega a la carpeta del frontend:
```
cd frontend
```
2. Instala las dependencias de Node.js:
```
npm install
```
3. Inicia el servidor en modo desarrollo:
```
npm run dev
```
4. Listo! El frontend estará disponible en http://localhost:3000.

## ✅ Ejecución de Tests
### 🔍 Tests en el Backend
Ejecuta los tests desde la raíz del backend:
```
pytest
```
### 🧪 Tests en el Frontend
Desde la carpeta del frontend, ejecuta:
```
npm run test
```

## 🎯 Extras
✔ Código modular y mantenible.
✔ Arquitectura limpia con separación de capas.
✔ Listo para escalar y añadir más funcionalidades.

