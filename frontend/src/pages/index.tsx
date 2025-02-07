import { useState } from 'react';

// Definimos los tipos que corresponden a la estructura de orden.
type OrderRoundItem = {
  name: string;
  quantity?: number;
  price?: number;
};

type OrderRound = {
  created: string;
  items: OrderRoundItem[];
};

type Order = {
  order_id: number;
  last_updated: string;
  paid: boolean;
  subtotal: number;
  taxes: number;
  discounts: number;
  items: OrderRoundItem[];
  rounds: OrderRound[];
};

export default function Home() {
  const [orderId, setOrderId] = useState<string>('');
  const [order, setOrder] = useState<Order | null>(null);
  const [error, setError] = useState<string>('');

  const fetchOrder = async () => {
    setError('');
    setOrder(null);
    try {
      // El backend está corriendo en http://localhost:8000
      const response = await fetch(`http://localhost:8000/orders/${orderId}`);
      if (!response.ok) {
        const errData = await response.json();
        setError(errData.detail || 'Error al consultar la orden');
      } else {
        const data: Order = await response.json();
        setOrder(data);
      }
    } catch {
      setError('Error al consultar la orden');
    }
  };

  return (
    <div className="min-h-screen p-4 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Consulta tu Orden</h1>
      <div className="mb-4 flex items-center">
        <input
          type="number"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
          placeholder="Ingrese ID de la orden"
          className="border border-gray-300 p-2 rounded mr-2"
        />
        <button
          onClick={fetchOrder}
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Consultar
        </button>
      </div>
      {error && <p className="text-red-500">{error}</p>}
      {order && (
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Orden #{order.order_id}</h2>
          <p><strong>Última actualización:</strong> {order.last_updated}</p>
          <p><strong>Pagada:</strong> {order.paid ? "Sí" : "No"}</p>
          <p><strong>Subtotal:</strong> {order.subtotal}</p>
          <p><strong>Impuestos:</strong> {order.taxes}</p>
          <p><strong>Descuentos:</strong> {order.discounts}</p>

          {/* Si hay items independientes */}
          {order.items && order.items.length > 0 && (
            <div className="mt-4">
              <h3 className="font-semibold">Items:</h3>
              <ul>
                {order.items.map((item, idx) => (
                  <li key={idx}>
                    {item.name} - {item.quantity ? `Cantidad: ${item.quantity}` : ''} {item.price ? `Precio: ${item.price}` : ''}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {order.rounds && order.rounds.length > 0 && (
            <div className="mt-4">
              <h3 className="font-semibold">Rondas:</h3>
              {order.rounds.map((round, index) => (
                <div key={index} className="mb-3 p-2 border border-gray-200 rounded">
                  <p><strong>Creada:</strong> {round.created}</p>
                  <ul className="list-disc ml-5">
                    {round.items.map((item, idx) => (
                      <li key={idx}>
                        {item.name} - {item.quantity ? `Cantidad: ${item.quantity}` : ''} {item.price ? `Precio: ${item.price}` : ''}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
