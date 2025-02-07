# app/models.py

from pydantic import BaseModel
from typing import List, Optional

# Modelo para un item dentro de una ronda.
class OrderRoundItem(BaseModel):
    name: str
    # Puede venir quantity o price
    quantity: Optional[int] = None
    price: Optional[float] = None

# Modelo para una ronda en la orden.
class OrderRound(BaseModel):
    created: str
    items: List[OrderRoundItem]

# Modelo para la orden completa.
class Order(BaseModel):
    order_id: int
    last_updated: str
    paid: bool
    subtotal: float
    taxes: float
    discounts: float
    items: List[OrderRoundItem]  # Items adicionales, en este ejemplo es una lista vacía.
    rounds: List[OrderRound]
