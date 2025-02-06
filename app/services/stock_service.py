# app/services/stock_service.py

from app.repositories.stock_repository import get_stock
from app.models import Stock

def fetch_stock() -> Stock:
    """Obtiene el stock actual mediante el repositorio."""
    return get_stock()
