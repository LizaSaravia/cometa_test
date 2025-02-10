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
        raise HTTPException(400, f"Error al actualizar stock: {str(e)}")
    return save_order(order)

def calculate_bill() -> dict:
    """
    Calcula la cuenta total y muestra dos opciones:
    - El desglose por amigo (según su consumo).
    - La cuenta dividida en partes iguales entre los amigos.
    """
    total = 0
    breakdown = {}
    orders = get_all_orders()

    # Sumar lo que consumió cada amigo
    for order in orders:
        friend = order.get("friend")
        if not friend:
            continue  # Si no hay un amigo asociado a la orden, lo saltamos.
        
        if friend not in breakdown:
            breakdown[friend] = 0
        for item in order.get("items", []):
            line_total = calculate_line_total(item.get("name"), item.get("quantity", 0))
            breakdown[friend] += line_total
            total += line_total

    # Dividir la cuenta en partes iguales
    num_friends = len(breakdown) if breakdown else 3  # Usar 3 amigos por defecto si no hay registros
    split_equally = {friend: round(total / num_friends, 2) for friend in breakdown}

    return {
        "total": round(total, 2),
        "breakdown": breakdown,  # Desglose por consumo
        "split_equally": split_equally  # Cuenta dividida en partes iguales
    }
