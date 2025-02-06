import { useState } from 'react';

type Order = {
  order_id: number;
  status: string;
  promotion?: string;
};

export default function Home() {
  const [orderId, setOrderId] = useState<string>('');
  const [order, setOrder] = useState<Order | null>(null);
  const [error, setError] = useState<string>('');

  const fetchOrder = async () => {
    setError('');
    setOrder(null);
    try {
      // Usamos la URL del backend que ya configuramos en la primera etapa.
      // Asegúrate de que el backend esté corriendo en http://localhost:8000
      const response = await fetch(`http://localhost:8000/orders/${orderId}`);
      if (!response.ok) {
        const errData = await response.json();
        setError(errData.detail || 'Error al consultar la orden');
      } else {
        const data: Order = await response.json();
        setOrder(data);
      }
    } catch (err) {
      setError('Error al consultar la orden');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-6">Consulta tu Orden</h1>
      <div className="mb-4 flex">
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
          <p data-testid="order-id">
            <strong>ID de la orden:</strong> {order.order_id}
          </p>
          <p>
            <strong>Estado:</strong> {order.status}
          </p>
          {order.promotion && (
            <p>
              <strong>Promoción:</strong> {order.promotion}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
