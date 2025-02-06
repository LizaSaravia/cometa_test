# tests/test_stock.py

from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_get_stock():
    # Realiza una petición GET al endpoint /stock
    response = client.get("/stock")
    assert response.status_code == 200

    # Convierte la respuesta a JSON
    data = response.json()

    # Valida que existan las claves principales y su valor
    assert "last_updated" in data
    assert "beers" in data
    assert data["last_updated"] == "2024-09-10 12:00:00"

    # Valida que 'beers' sea una lista de 3 elementos
    beers = data["beers"]
    assert isinstance(beers, list)
    assert len(beers) == 3

    # Valida la información de la primera cerveza: Corona
    corona = beers[0]
    assert corona["name"] == "Corona"
    assert corona["price"] == 115
    assert corona["quantity"] == 2

    # Valida la información de la segunda cerveza: Quilmes
    quilmes = beers[1]
    assert quilmes["name"] == "Quilmes"
    assert quilmes["price"] == 120
    assert quilmes["quantity"] == 0

    # Valida la información de la tercera cerveza: Club Colombia
    club_colombia = beers[2]
    assert club_colombia["name"] == "Club Colombia"
    assert club_colombia["price"] == 110
    assert club_colombia["quantity"] == 3
