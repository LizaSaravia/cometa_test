# tests/test_orders.py

from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_get_order_success():
    # Prueba obtener una orden existente (por ejemplo, order_id=1)
    response = client.get("/orders/1")
    assert response.status_code == 200
    data = response.json()
    assert data["order_id"] == 1
    assert "status" in data

def test_get_order_with_promotion():
    # Prueba obtener una orden que tiene promoción (order_id=2)
    response = client.get("/orders/2")
    assert response.status_code == 200
    data = response.json()
    assert data["order_id"] == 2
    assert data["promotion"] == "2x1"

def test_get_order_not_found():
    # Prueba obtener una orden que no existe
    response = client.get("/orders/999")
    assert response.status_code == 404
    data = response.json()
    assert data["detail"] == "Orden no encontrada"
