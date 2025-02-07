# app/main.py

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from app.services.order_service import fetch_order

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
    return order.model_dump()
