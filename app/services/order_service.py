# app/services/order_service.py

from app.repositories.order_repository import get_order_by_id
from app.models import Order

def fetch_order(order_id: int) -> Order:
    """
    Obtiene una orden y la transforma en una instancia del modelo Order.
    """
    order_data = get_order_by_id(order_id)
    if not order_data:
        return None
    # Aquí podrías agregar lógica adicional, por ejemplo, aplicar reglas de promoción.
    return Order(**order_data)
