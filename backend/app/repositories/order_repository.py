# app/repositories/order_repository.py
from app.models import Order
from app.data import ORDERS
from datetime import datetime

# Contador global para asignar order_id a cada nueva orden
ORDER_ID_COUNTER = 1

def save_order(order_data: dict) -> dict:
    global ORDER_ID_COUNTER
    if "order_id" not in order_data:
        order_data["order_id"] = ORDER_ID_COUNTER
        ORDER_ID_COUNTER += 1
    if "paid" not in order_data:
        order_data["paid"] = False
    if "last_updated" not in order_data:
        order_data["last_updated"] = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    if "subtotal" not in order_data:
        order_data["subtotal"] = 0
    if "taxes" not in order_data:
        order_data["taxes"] = 0
    if "discounts" not in order_data:
        order_data["discounts"] = 0
    if "rounds" not in order_data:
        order_data["rounds"] = []
    ORDERS.append(order_data)
    return order_data

def get_all_orders() -> list:
    return ORDERS

def get_order_by_id(order_id: int) -> dict:
    for order in ORDERS:
        if order.get("order_id") == order_id:
            return Order(**order)
    return None
