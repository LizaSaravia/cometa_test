# app/repositories/stock_repository.py

from app.models import Stock

# Definimos la base de datos en memoria con la estructura de stock sugerida.
STOCK_DATA = {
    "last_updated": "2024-09-10 12:00:00",
    "beers": [
        {"name": "Corona", "price": 115, "quantity": 2},
        {"name": "Quilmes", "price": 120, "quantity": 0},
        {"name": "Club Colombia", "price": 110, "quantity": 3}
    ]
}

def get_stock() -> Stock:
    """Devuelve el stock actual en memoria."""
    return Stock(**STOCK_DATA)
