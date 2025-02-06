# app/main.py

from fastapi import FastAPI, HTTPException
from app.services.stock_service import fetch_stock

app = FastAPI(
    title="Bar Stock API",
    description="API para obtener el stock de cervezas en el bar.",
    version="1.0.0"
)

@app.get("/stock", response_model=dict)
def get_stock_endpoint():
    """
    Endpoint para obtener el stock de cervezas.
    Devuelve la información en memoria con la estructura:
    {
        "last_updated": "2024-09-10 12:00:00",
        "beers": [
            { "name": "Corona", "price": 115, "quantity": 2 },
            { "name": "Quilmes", "price": 120, "quantity": 0 },
            { "name": "Club Colombia", "price": 110, "quantity": 3 }
        ]
    }
    """
    stock = fetch_stock()
    if not stock:
        raise HTTPException(status_code=404, detail="Stock no encontrado")
    # Para Pydantic v2 se recomienda usar model_dump(), o dict() si usas v1.
    return stock.model_dump()
