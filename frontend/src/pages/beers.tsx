import { useState, useEffect } from "react";
import NavBar from "../components/NavBar";

type Beer = {
  name: string;
  price: number;
  quantity: number;
};

type AvailableBeer = {
  last_updated: string;
  beers: Beer[];
};

export default function Beers() {
  const [availableBeer, setAvailableBeer] = useState<AvailableBeer | null>(null);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchBeers = async () => {
      try {
        const response = await fetch("http://localhost:8000/beers");
        if (!response.ok) {
          const errData = await response.json();
          setError(errData.detail || "Error fetching beers");
        } else {
          const data: AvailableBeer = await response.json();
          setAvailableBeer(data);
        }
      } catch (err) {
        console.error(err);
        setError("Error fetching beers");
      }
    };

    fetchBeers();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <div className="max-w-4xl mx-auto p-8">
        <h1 className="text-4xl font-bold text-primary mb-4">Cerveza Disponible</h1>
        {error && <p className="text-red-500">{error}</p>}
        {!error && !availableBeer && <p>Cargando...</p>}
        {availableBeer && (
          <>
            <p className="text-lg mb-4">
              <strong>Última actualización:</strong> {availableBeer.last_updated}
            </p>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white rounded-lg shadow overflow-hidden">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="py-3 px-4 text-left">Nombre</th>
                    <th className="py-3 px-4 text-left">Precio</th>
                    <th className="py-3 px-4 text-left">Cantidad</th>
                  </tr>
                </thead>
                <tbody>
                  {availableBeer.beers.map((beer, index) => (
                    <tr key={index} className="border-t">
                      <td className="py-3 px-4">{beer.name}</td>
                      <td className="py-3 px-4">{beer.price}</td>
                      <td className="py-3 px-4">{beer.quantity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
