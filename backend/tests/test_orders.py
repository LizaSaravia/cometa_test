import sys
import os

# Agrega el directorio raíz del proyecto para poder importar 'app'
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from fastapi.testclient import TestClient
from app.main import app
from app.data import ORDERS, PAYMENTS, AVAILABLE_BEER

client = TestClient(app)

def reset_stock():
    AVAILABLE_BEER["beers"] = [
        {"name": "Corona", "price": 115, "quantity": 2, "promotion": "2x1"},
        {"name": "Quilmes", "price": 120, "quantity": 0},
        {"name": "Club Colombia", "price": 110, "quantity": 3}
    ]
    AVAILABLE_BEER["last_updated"] = "2024-09-10 12:00:00"

def test_get_order_success():
    reset_stock()
    ORDERS.clear()
    order_payload = {
       "friend": "Rodrigo",
       "items": [{"name": "Corona", "quantity": 1}]
    }
    post_response = client.post("/order", json=order_payload)
    assert post_response.status_code == 200, f"Expected 200, got {post_response.status_code}"
    order = post_response.json().get("order", {})
    order_id = order.get("order_id")
    assert order_id is not None, "order_id should not be None"
    # Consulta la orden por su id
    response = client.get(f"/orders/{order_id}")
    assert response.status_code == 200, f"Expected 200, got {response.status_code}"
    data = response.json()
    assert data["order_id"] == order_id
    # Verifica que se incluyan las claves obligatorias
    assert "paid" in data and data["paid"] is False
    assert "subtotal" in data
    assert "taxes" in data
    assert "discounts" in data
    assert "rounds" in data

def test_get_order_not_found():
    ORDERS.clear()
    response = client.get("/orders/999")
    assert response.status_code == 404, f"Expected 404, got {response.status_code}"
    data = response.json()
    assert data["detail"] == "Orden no encontrada"

def test_receive_order():
    reset_stock()
    ORDERS.clear()
    order_payload = {
        "friend": "Ailen",
        "items": [{"name": "Club Colombia", "quantity": 1}]
    }
    response = client.post("/order", json=order_payload)
    assert response.status_code == 200, f"Expected 200, got {response.status_code}"
    data = response.json()
    assert "Orden recibida" in data.get("message", "")
    order = data.get("order", {})
    assert "order_id" in order
    assert order["friend"] == "Ailen"
    assert order["paid"] is False

def test_get_bill():
    reset_stock()
    ORDERS.clear()
    # Agrega dos órdenes para "Corona": una para Rodrigo y otra para Ailen.
    order1 = {"friend": "Rodrigo", "items": [{"name": "Corona", "quantity": 1}]}
    order2 = {"friend": "Ailen", "items": [{"name": "Corona", "quantity": 1}]}
    resp1 = client.post("/order", json=order1)
    resp2 = client.post("/order", json=order2)
    assert resp1.status_code == 200, f"Expected 200, got {resp1.status_code}"
    assert resp2.status_code == 200, f"Expected 200, got {resp2.status_code}"
    
    response = client.get("/bill")
    assert response.status_code == 200, f"Expected 200, got {response.status_code}"
    data = response.json()
    
    # Validamos que la respuesta contenga las claves directamente
    assert "total" in data, "Missing 'total' in bill response"
    assert "breakdown_by_friend" in data, "Missing 'breakdown_by_friend' in bill response"
    assert "equal_split" in data, "Missing 'equal_split' in bill response"
    
    # Verificamos el total
    assert data["total"] == 230, f"Expected total 230, got {data['total']}"
    
    # Verificamos el desglose por amigo
    breakdown = data["breakdown_by_friend"]
    assert breakdown.get("Rodrigo") == 115, f"Expected Rodrigo 115, got {breakdown.get('Rodrigo')}"
    assert breakdown.get("Ailen") == 115, f"Expected Ailen 115, got {breakdown.get('Ailen')}"

def test_pay_bill():
    PAYMENTS.clear()
    payment_payload = {"friend": "Ornela", "amount": 115.0}
    response = client.post("/pay", json=payment_payload)
    assert response.status_code == 200, f"Expected 200, got {response.status_code}"
    data = response.json()
    assert data.get("message") == "Pago registrado"
    payment = data.get("payment", {})
    assert payment.get("friend") == "Ornela"
    assert payment.get("amount") == 115.0
