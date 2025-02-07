# app/services/order_service.py

from app.repositories.order_repository import get_order_by_id
from app.models import Order

def fetch_order(order_id: int) -> Order:
    """
    Obtiene la orden correspondiente al ID indicado.
    """
    return get_order_by_id(order_id)
