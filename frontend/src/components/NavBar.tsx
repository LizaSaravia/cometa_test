import Link from "next/link";

export default function NavBar() {
  return (
    <nav className="bg-gradient-to-r from-primary to-secondary shadow-lg p-4">
      <ul className="flex justify-around items-center">
        <li>
          <Link href="/" className="text-white text-lg font-medium">
            Inicio
          </Link>
        </li>
        <li>
          <Link href="/beers" className="text-white text-lg font-medium">
            Cerveza
          </Link>
        </li>
        <li>
          <Link href="/order" className="text-white text-lg font-medium">
            Orden
          </Link>
        </li>
        <li>
          <Link href="/bill" className="text-white text-lg font-medium">
            Cuenta
          </Link>
        </li>
        <li>
          <Link href="/payment" className="text-white text-lg font-medium">
            Pago
          </Link>
        </li>
      </ul>
    </nav>
  );
}
