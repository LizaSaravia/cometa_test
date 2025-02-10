# app/services/order_service.py
from app.repositories.order_repository import save_order, get_all_orders
from app.data import calculate_line_total, update_stock
from app.models import OrderInput
from fastapi import HTTPException

def fetch_order(order_id: int) -> dict:
    """
    Recupera una orden por su ID. Si no existe, lanza HTTPException con código 404.
    """
    from app.repositories.order_repository import get_order_by_id  # Import interno para evitar circularidad
    order = get_order_by_id(order_id)
    if not order:
        raise HTTPException(404, "Orden no encontrada")
    return order

def receive_order(order: dict) -> dict:
    """
    Procesa la orden:
      - Actualiza el stock (si no hay suficiente, lanza error).
      - Guarda la orden en memoria.
    """
    try:
        update_stock(order)
    except Exception as e:
        raise HTTPException(400, str(e))
    return save_order(order)

def calculate_bill() -> dict:
    """
    Calcula la cuenta total y el desglose por amigo basándose en las órdenes.
    Para cada item, utiliza calculate_line_total para aplicar promociones.
    """
    total = 0
    breakdown = {}
    orders = get_all_orders()
    for order in orders:
        friend = order.get("friend")
        if friend not in breakdown:
            breakdown[friend] = 0
        for item in order.get("items", []):
            line_total = calculate_line_total(item.get("name"), item.get("quantity", 0))
            breakdown[friend] += line_total
            total += line_total
    return {"total": total, "breakdown": breakdown}
