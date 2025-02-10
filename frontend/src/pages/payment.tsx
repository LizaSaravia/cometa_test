// src/pages/payment.tsx
import { useState } from "react";
import NavBar from "../components/NavBar";

const friends = ["Rodrigo", "Ailen", "Ornela"];

export default function Payment() {
  const [selectedFriend, setSelectedFriend] = useState<string>(friends[0]);
  const [amount, setAmount] = useState<number>(0);
  const [message, setMessage] = useState<string>("");

  const handlePayment = async () => {
    try {
      const response = await fetch("http://localhost:8000/pay", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ friend: selectedFriend, amount }),
      });
      const data = await response.json();
      if (!response.ok) {
        const errorDetail = data.detail;
        setMessage(
          typeof errorDetail === "object"
            ? JSON.stringify(errorDetail)
            : errorDetail || "Error en el pago"
        );
      } else {
        setMessage("Pago realizado correctamente");
      }
    } catch (err) {
      setMessage("Error en el pago");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <div className="max-w-md mx-auto p-8 bg-white rounded-lg shadow-md">
        {/* Enlace para volver a Inicio */}
        <div className="mb-4">
          <a href="/" className="text-blue-500 hover:underline">← Volver a Inicio</a>
        </div>
        <h1 className="text-3xl font-bold text-primary mb-6 text-center">
          Interfaz de Pago
        </h1>
        <div className="mb-4">
          <label htmlFor="friend-select" className="block mb-2 font-medium">
            Selecciona el amigo:
          </label>
          <select
            id="friend-select"
            value={selectedFriend}
            onChange={(e) => setSelectedFriend(e.target.value)}
            className="w-full p-2 border rounded"
          >
            {friends.map((friend, idx) => (
              <option key={idx} value={friend}>
                {friend}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="payment-amount" className="block mb-2 font-medium">
            Valor a pagar:
          </label>
          <input
            id="payment-amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(parseFloat(e.target.value))}
            className="w-full p-2 border rounded"
          />
        </div>
        <button
          onClick={handlePayment}
          className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600 transition-colors"
        >
          Pagar
        </button>
        {message && <p className="mt-4 text-center text-lg">{message}</p>}
      </div>
    </div>
  );
}
