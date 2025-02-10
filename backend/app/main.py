from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from app.services.order_service import fetch_order, receive_order, calculate_bill
from app.data import AVAILABLE_BEER
from app.models import OrderInput, PaymentInput
from app.data import PAYMENTS

app = FastAPI(
    title="Bar Orders API",
    description="API para obtener la información completa de una orden.",
    version="1.0.0"
)

# Configuración de CORS para permitir solicitudes desde el frontend (localhost:3000)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/orders/{order_id}", response_model=dict)
def get_order_status(order_id: int):
    """
    Endpoint para obtener la información completa de una orden.
    Retorna una estructura con:
      - order_id: int
      - last_updated: str
      - paid: bool
      - subtotal: float
      - taxes: float
      - discounts: float
      - items: list
      - rounds: list (con cada round y sus items)
    """
    order = fetch_order(order_id)
    if not order:
        raise HTTPException(status_code=404, detail="Orden no encontrada")
    return order.model_dump()  # Asegúrate de que model_dump esté bien implementado en el modelo de OrderInput.

@app.get("/beers")
def list_beers():
    """Lista la cerveza disponible (incluyendo stock actualizado)."""
    return AVAILABLE_BEER

@app.post("/order")
def receive_order_endpoint(order: OrderInput):
    """Recibe una orden y actualiza el stock."""
    saved_order = receive_order(order.dict())
    return {"message": "Orden recibida", "order": saved_order}

@app.get("/bill")
def get_bill():
    """Calcula y retorna la cuenta total, desglose por amigo y opción de división equitativa."""
    bill = calculate_bill()
    
    # Se eliminó el print para producción
    return {
        "total": bill.get("total", 0),
        "breakdown_by_friend": bill.get("breakdown", {}),
        "equal_split": bill.get("split_equally", {})
    }

@app.post("/pay")
def pay_bill(payment: PaymentInput):
    """Registra un pago (sin conexión a pasarela de pago)."""
    PAYMENTS.append(payment.dict())
    return {"message": "Pago registrado", "payment": payment.dict()}
