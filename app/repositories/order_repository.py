# app/repositories/order_repository.py

from app.models import Order

# Simulamos una "base de datos" en memoria para órdenes.
ORDER_DATA = {
    1: {
        "order_id": 1,
        "last_updated": "2024-09-10 12:00:00",
        "paid": False,
        "subtotal": 0,
        "taxes": 0,
        "discounts": 0,
        "items": [],
        "rounds": [
            {
                "created": "2024-09-10 12:00:30",
                "items": [
                    {"name": "Corona", "quantity": 2},
                    {"name": "Club Colombia", "quantity": 1}
                ]
            },
            {
                "created": "2024-09-10 12:20:31",
                "items": [
                    {"name": "Club Colombia", "quantity": 1},
                    {"name": "Quilmes", "price": 2}
                ]
            },
            {
                "created": "2024-09-10 12:43:21",
                "items": [
                    {"name": "Quilmes", "quantity": 3}
                ]
            }
        ]
    }
    # Aquí se podrían agregar más órdenes con distintos IDs si se requiere.
}

def get_order_by_id(order_id: int):
    """
    Devuelve la orden con el ID dado. Si no existe, retorna None.
    """
    data = ORDER_DATA.get(order_id)
    if data:
        return Order(**data)
    return None
