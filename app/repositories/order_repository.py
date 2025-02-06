# app/repositories/order_repository.py

# Simulamos una base de datos con algunos datos de ejemplo
ORDERS_DB = {
    1: {"order_id": 1, "status": "pendiente", "promotion": None},
    2: {"order_id": 2, "status": "en preparación", "promotion": "2x1"},
    3: {"order_id": 3, "status": "servido", "promotion": None},
}

def get_order_by_id(order_id: int) -> dict:
    """
    Simula la obtención de una orden por ID.
    """
    return ORDERS_DB.get(order_id)
