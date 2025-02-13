import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import Home from '../src/pages/index';
import Beers from '../src/pages/beers';
import OrderPage from '../src/pages/order';
import BillPage from '../src/pages/bill';
import Payment from '../src/pages/payment';

// Si global.fetch no está definido, lo definimos como jest.fn()
if (!global.fetch) {
  global.fetch = jest.fn();
}

beforeEach(() => {
  // Resetea todos los mocks y asigna global.fetch a un jest.fn() nuevo.
  jest.resetAllMocks();
  global.fetch = jest.fn();
});

// ----------------------
// Test para la Landing Page (Home)
// ----------------------
describe('Home Page', () => {
  it('renders landing page with navigation links', () => {
    render(<Home />);
    const title = screen.getByRole('heading', { name: /bienvenido a bar orders/i });
    expect(title).toBeInTheDocument();
    expect(screen.getByText(/Cerveza Disponible/i)).toBeInTheDocument();
    expect(screen.getByText(/Recibir Orden/i)).toBeInTheDocument();
    expect(screen.getByText(/Obtener Cuenta/i)).toBeInTheDocument();
    expect(screen.getByText(/Pagar Cuenta/i)).toBeInTheDocument();
  });
});

// ----------------------
// Test para la Página de Cervezas (Beers)
// ----------------------
describe('Beers Page', () => {
  it('renders loading state initially and then displays beer list when fetch succeeds', async () => {
    const fakeBeers = {
      last_updated: "2024-09-10 12:00:00",
      beers: [
        { name: "Corona", price: 115, quantity: 2, promotion: "2x1" },
        { name: "Club Colombia", price: 110, quantity: 3 }
      ]
    };

    // Mockea fetch para devolver fakeBeers
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => fakeBeers,
    });

    render(<Beers />);
    expect(screen.getByText(/Cargando/i)).toBeInTheDocument();
    await waitFor(() => expect(screen.getByText(/Corona/i)).toBeInTheDocument());
    expect(screen.getByText(/Club Colombia/i)).toBeInTheDocument();
  });
});

// ----------------------
// Test para la Página de Orden (Order)
// ----------------------
describe('Order Page', () => {
  it('renders order form with friend selection and item inputs', () => {
    render(<OrderPage />);
    expect(screen.getByText(/Recibir Orden/i)).toBeInTheDocument();
    // Se usa htmlFor e id en OrderPage para asociar correctamente el label
    expect(screen.getByLabelText(/Selecciona el amigo/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Nombre de la cerveza/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Cantidad/i)).toBeInTheDocument();
  });
});

// ----------------------
// Test para la Página de Cuenta (Bill)
// ----------------------

describe('Bill Page', () => {
  it('renders loading state and then displays bill information when fetch succeeds', async () => {
    const fakeBill = {
      total: 230,
      breakdown_by_friend: { "Rodrigo": 115, "Ailen": 115 },
      equal_split: { "Rodrigo": 115, "Ailen": 115 }
    };

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => fakeBill,
    });

    render(<BillPage />);
    expect(screen.getByText(/Cargando/i)).toBeInTheDocument();
    
    // Espera a que se muestre el total
    await waitFor(() => expect(screen.getByText(/Total de la cuenta/i)).toBeInTheDocument());
    expect(screen.getByText(/\$230\.00/)).toBeInTheDocument();

    // --- Verifica la sección "Desglose por amigo" ---
    const breakdownSection = screen.getByText(/Desglose por amigo/i).closest('div');
    expect(breakdownSection).toBeInTheDocument();

    // Busca todos los elementos de lista dentro de esta sección
    const listItemsBreakdown = within(breakdownSection!).getAllByRole('listitem');

    // Busca el elemento que contenga "Rodrigo"
    const rodriItemBreakdown = listItemsBreakdown.find(item => item.textContent?.includes("Rodrigo"));
    expect(rodriItemBreakdown).toBeDefined();
    expect(rodriItemBreakdown).toHaveTextContent("$115.00");

    // Busca el elemento que contenga "Ailen"
    const ailenItemBreakdown = listItemsBreakdown.find(item => item.textContent?.includes("Ailen"));
    expect(ailenItemBreakdown).toBeDefined();
    expect(ailenItemBreakdown).toHaveTextContent("$115.00");

    // --- Verifica la sección "División equitativa" ---
    const equalSplitSection = screen.getByText(/División equitativa/i).closest('div');
    expect(equalSplitSection).toBeInTheDocument();

    const listItemsEqualSplit = within(equalSplitSection!).getAllByRole('listitem');

    const rodriItemEqual = listItemsEqualSplit.find(item => item.textContent?.includes("Rodrigo"));
    expect(rodriItemEqual).toBeDefined();
    expect(rodriItemEqual).toHaveTextContent("$115.00");

    const ailenItemEqual = listItemsEqualSplit.find(item => item.textContent?.includes("Ailen"));
    expect(ailenItemEqual).toBeDefined();
    expect(ailenItemEqual).toHaveTextContent("$115.00");
  });
});

// ----------------------
// Test para la Página de Pago (Payment)
// ----------------------
describe('Payment Page', () => {
  it('renders payment form and submits payment successfully', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ message: "Pago realizado correctamente" }),
    });

    render(<Payment />);
    expect(screen.getByText(/Interfaz de Pago/i)).toBeInTheDocument();
    const select = screen.getByLabelText(/Selecciona el amigo/i);
    fireEvent.change(select, { target: { value: "Ailen" } });
    const input = screen.getByLabelText(/Valor a pagar/i);
    fireEvent.change(input, { target: { value: "115" } });
    const button = screen.getByRole('button', { name: /Pagar/i });
    fireEvent.click(button);
    await waitFor(() => expect(screen.getByText(/Pago realizado correctamente/i)).toBeInTheDocument());
  });
});
