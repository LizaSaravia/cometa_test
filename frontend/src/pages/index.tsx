import NavBar from "../components/NavBar";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <div className="max-w-4xl mx-auto p-8">
        <h1 className="text-5xl font-bold text-center text-primary mb-6">
          Bienvenido a Bar Orders
        </h1>
        <p className="text-center text-lg text-gray-700 mb-8">
          Selecciona una opción para interactuar con el sistema:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Link href="/beers">
            <div className="cursor-pointer p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-200">
              <h2 className="text-2xl font-semibold text-primary mb-2">Cerveza Disponible</h2>
              <p className="text-gray-600">Ver el stock y los precios de la cerveza.</p>
            </div>
          </Link>
          <Link href="/order">
            <div className="cursor-pointer p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-200">
              <h2 className="text-2xl font-semibold text-primary mb-2">Recibir Orden</h2>
              <p className="text-gray-600">Realiza una orden de cerveza.</p>
            </div>
          </Link>
          <Link href="/bill">
            <div className="cursor-pointer p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-200">
              <h2 className="text-2xl font-semibold text-primary mb-2">Obtener Cuenta</h2>
              <p className="text-gray-600">Consulta el total a pagar y desglose de la cuenta.</p>
            </div>
          </Link>
          <Link href="/payment">
            <div className="cursor-pointer p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-200">
              <h2 className="text-2xl font-semibold text-primary mb-2">Pagar Cuenta</h2>
              <p className="text-gray-600">Registra tu pago y comparte la cuenta.</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
