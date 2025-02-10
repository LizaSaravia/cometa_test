# app/data.py
from datetime import datetime

# Stock inicial con promoción para "Corona"
AVAILABLE_BEER = {
    "last_updated": "2024-09-10 12:00:00",
    "beers": [
        {"name": "Corona", "price": 115, "quantity": 2, "promotion": "2x1"},
        {"name": "Quilmes", "price": 120, "quantity": 0},
        {"name": "Club Colombia", "price": 110, "quantity": 3}
    ]
}

# Bases de datos en memoria para órdenes y pagos
ORDERS = []  # Cada orden es un dict con "friend" y "items"
PAYMENTS = []  # Cada pago es un dict

def get_beer_price(name: str) -> float:
    """Devuelve el precio base de la cerveza (búsqueda case-insensitive)."""
    for beer in AVAILABLE_BEER["beers"]:
        if beer["name"].lower() == name.lower():
            return beer["price"]
    return 0

def get_beer_data(name: str) -> dict:
    """Devuelve la información completa de una cerveza (incluyendo promoción)"""
    for beer in AVAILABLE_BEER["beers"]:
        if beer["name"].lower() == name.lower():
            return beer
    return {}

def calculate_line_total(name: str, quantity: int) -> float:
    """
    Calcula el costo efectivo para una línea de pedido.
    
    Si la cerveza tiene la promoción "2x1":
      - Si se ordena 1: se paga 1 * price.
      - Si se ordenan 2: se paga 1 * price.
      - Si se ordenan 3: se paga 2 * price.
      - En general: cost = price * (quantity // 2 + quantity % 2).
    
    Para cervezas sin promoción, se multiplica directamente por la cantidad.
    """
    beer = get_beer_data(name)
    if not beer:
        return 0
    price = beer.get("price", 0)
    promotion = beer.get("promotion")
    if promotion == "2x1":
        effective_quantity = (quantity // 2) + (quantity % 2)
        return effective_quantity * price
    else:
        return quantity * price

def update_stock(order: dict) -> None:
    """
    Actualiza el stock restando la cantidad pedida de cada cerveza.
    
    Si no hay stock suficiente, lanza una excepción.
    Actualiza el campo 'last_updated' a la hora actual.
    """
    for item in order.get("items", []):
        beer_name = item.get("name", "").lower()
        order_qty = item.get("quantity", 0)
        found = False
        for beer in AVAILABLE_BEER["beers"]:
            if beer["name"].lower() == beer_name:
                found = True
                if beer["quantity"] < order_qty:
                    raise Exception(
                        f"No hay suficiente stock de {beer['name']}. Disponible: {beer['quantity']}, solicitado: {order_qty}"
                    )
                beer["quantity"] -= order_qty
                break
        if not found:
            raise Exception(f"La cerveza {item.get('name')} no se encuentra en stock.")
    AVAILABLE_BEER["last_updated"] = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
