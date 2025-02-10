import { useState, useEffect } from "react";
import NavBar from "../components/NavBar";

type BillBreakdown = {
  [friend: string]: number;
};

type BillData = {
  total: number;
  breakdown_by_friend: BillBreakdown;
  equal_split: BillBreakdown;
};

export default function BillPage() {
  const [billData, setBillData] = useState<BillData | null>(null);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchBill = async () => {
      try {
        const response = await fetch("http://localhost:8000/bill");
        if (!response.ok) {
          const errData = await response.json();
          setError(errData.detail || "Error al obtener la cuenta");
        } else {
          const data: BillData = await response.json();
          setBillData(data);
        }
      } catch (err) {
        setError("Error al obtener la cuenta");
      }
    };

    fetchBill();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <div className="max-w-lg mx-auto p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-primary mb-4">Cuenta</h1>

        {error && <p className="text-red-500">{error}</p>}
        {!error && !billData && <p>Cargando...</p>}

        {billData && (
          <>
            <p className="text-lg mb-4">
              <strong>Total de la cuenta:</strong> ${billData.total.toFixed(2)}
            </p>

            <div className="mb-4">
              <h2 className="font-semibold mb-2">Desglose por amigo:</h2>
              <ul className="list-disc ml-6">
                {Object.entries(billData.breakdown_by_friend).map(([friend, amount]) => (
                  <li key={friend} className="text-gray-700">
                    {friend}: <strong>${amount.toFixed(2)}</strong>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-gray-100 p-4 rounded-lg">
              <h2 className="font-semibold">División equitativa:</h2>
              <ul className="list-disc ml-6">
                {Object.entries(billData.equal_split).map(([friend, amount]) => (
                  <li key={friend} className="text-gray-700">
                    {friend}: <strong>${amount.toFixed(2)}</strong>
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
