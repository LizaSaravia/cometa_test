# app/main.py

from fastapi import FastAPI, HTTPException
from app.services.order_service import fetch_order

app = FastAPI(
    title="Bar Orders API",
    description="API para obtener el estado de la orden en un bar que vende cerveza.",
    version="1.0.0"
)

@app.get("/orders/{order_id}", response_model=dict)
def get_order_status(order_id: int):
    """
    Endpoint para obtener el estado de una orden.
    """
    order = fetch_order(order_id)
    if not order:
        raise HTTPException(status_code=404, detail="Orden no encontrada")
    return order.dict()
