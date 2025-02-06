// frontend/__tests__/Home.test.tsx

import { render, screen, fireEvent } from '@testing-library/react';
import Home from '../src/pages';

// Vamos a simular fetch. Por simplicidad, en estos tests haremos mocks del método global fetch.

describe('Home page', () => {
  beforeEach(() => {
    // Resetea cualquier mock previo en fetch
    jest.resetAllMocks();
  });

  it('muestra el título principal', () => {
    render(<Home />);
    const heading = screen.getByRole('heading', { name: /consulta tu orden/i });
    expect(heading).toBeInTheDocument();
  });

  it('muestra un error cuando la consulta falla', async () => {
    // Simula una respuesta fallida de la API
    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      ok: false,
      json: async () => ({ detail: 'Orden no encontrada' }),
    } as Response);

    render(<Home />);
    const input = screen.getByPlaceholderText(/ingrese id de la orden/i);
    fireEvent.change(input, { target: { value: '999' } });
    const button = screen.getByRole('button', { name: /consultar/i });
    fireEvent.click(button);

    const errorMessage = await screen.findByText(/orden no encontrada/i);
    expect(errorMessage).toBeInTheDocument();
  });

  it('muestra la información de la orden cuando la consulta es exitosa', async () => {
    // Simula una respuesta exitosa de la API
    const fakeOrder = { order_id: 1, status: 'pendiente', promotion: null };
    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: async () => fakeOrder,
    } as Response);
  
    render(<Home />);
    const input = screen.getByPlaceholderText(/ingrese id de la orden/i);
    fireEvent.change(input, { target: { value: '1' } });
    const button = screen.getByRole('button', { name: /consultar/i });
    fireEvent.click(button);
  
    // Busca el elemento usando el data-testid
    const orderIdElement = await screen.findByTestId('order-id');
    expect(orderIdElement).toHaveTextContent('1');
  });  
});
