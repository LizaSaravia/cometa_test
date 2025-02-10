import { useState } from "react";
import NavBar from "../components/NavBar";

type OrderItem = {
  name: string;
  quantity: number;
};

type OrderInput = {
  friend: string;
  items: OrderItem[];
};

export default function OrderPage() {
  // Actualizamos los nombres de los amigos
  const friends = ["Rodrigo", "Ailen", "Ornela"];
  const [friend, setFriend] = useState<string>(friends[0]);
  // Estado inicial: un ítem vacío con cantidad 0
  const initialItemsState: OrderItem[] = [{ name: "", quantity: 0 }];
  const [items, setItems] = useState<OrderItem[]>(initialItemsState);
  const [message, setMessage] = useState<string>("");

  const handleItemChange = (
    index: number,
    field: keyof OrderItem,
    value: string | number
  ) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: value };
    setItems(newItems);
  };

  const addItem = () => {
    setItems([...items, { name: "", quantity: 0 }]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    const orderPayload: OrderInput = { friend, items };
    try {
      const response = await fetch("http://localhost:8000/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderPayload),
      });
      const data = await response.json();
      if (!response.ok) {
        setMessage(data.detail || "Error al enviar la orden");
      } else {
        setMessage("Orden recibida exitosamente");
        // Reinicia los campos: limpia los ítems y establece la cantidad a 0
        setItems(initialItemsState);
        // Opcional: reinicia el amigo al valor por defecto
        setFriend(friends[0]);
      }
    } catch (error) {
      setMessage("Error al enviar la orden");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <div className="max-w-lg mx-auto p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-primary mb-6">Recibir Orden</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            {/* Se asocia el label con el select mediante htmlFor e id */}
            <label htmlFor="friend-select" className="block mb-2">
              Selecciona el amigo:
            </label>
            <select
              id="friend-select"
              value={friend}
              onChange={(e) => setFriend(e.target.value)}
              className="w-full p-2 border rounded"
            >
              {friends.map((f, idx) => (
                <option key={idx} value={f}>
                  {f}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block mb-2">Items de la orden:</label>
            {items.map((item, index) => (
              <div key={index} className="flex space-x-2 mb-2">
                <input
                  type="text"
                  placeholder="Nombre de la cerveza"
                  value={item.name}
                  onChange={(e) =>
                    handleItemChange(index, "name", e.target.value)
                  }
                  className="w-2/3 p-2 border rounded"
                />
                <input
                  type="number"
                  placeholder="Cantidad"
                  value={item.quantity}
                  onChange={(e) =>
                    handleItemChange(
                      index,
                      "quantity",
                      parseInt(e.target.value)
                    )
                  }
                  className="w-1/3 p-2 border rounded"
                />
              </div>
            ))}
            <button
              type="button"
              onClick={addItem}
              className="text-blue-500 underline"
            >
              Agregar otro item
            </button>
          </div>
          <button
            type="submit"
            className="w-full bg-primary text-white p-2 rounded hover:bg-primary-dark transition-colors"
          >
            Enviar Orden
          </button>
          {message && <p className="mt-4 text-center">{message}</p>}
        </form>
      </div>
    </div>
  );
}
