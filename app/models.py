from pydantic import BaseModel
from typing import Optional

class Order(BaseModel):
    order_id: int # que sea un entero
    status: str  # Por ejemplo: "pendiente", "en preparación", "servido"
    promotion: Optional[str] = None  # Puede tener promoción activa, p.ej.: "2x1"
