import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import data from '../services/data'
import App from '../App';

test('Testa se a Api é chamada e renderizada', async () => {
  global.fetch = jest.fn().mockResolvedValue({
    json: jest.fn().mockResolvedValue(data)
  });

  render(<App />);
  await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1))
});

test('Testa o filtro de busca', async () => {
  global.fetch = jest.fn().mockResolvedValue({
    json: jest.fn().mockResolvedValue(data)
  });

  render(<App />);
  const search = screen.getByTestId('name-filter');
  userEvent.type(search, 'testando');
  expect(search).toHaveValue('testando')
});


test('testa os inputs numericos', async () => {
  global.fetch = jest.fn().mockResolvedValue({
    json: jest.fn().mockResolvedValue(data)
  });

  render(<App />);
  await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1))
  const column = screen.getByTestId('column-filter')
  const comparison = screen.getByTestId('comparison-filter');
  const value = screen.getByTestId('value-filter');
  userEvent.selectOptions(column, 'rotation_period');
  userEvent.selectOptions(comparison, 'igual a');
  userEvent.clear(value);
  userEvent.type(value, '23');
  const button = screen.getByText('FILTRO')
  userEvent.click(button);
  userEvent.click(button);
  const sort = screen.getByTestId('column-sort')
  userEvent.selectOptions(sort, 'orbital_period');
  const rows = screen.getAllByRole('row');
  const desc = screen.getByTestId('column-sort-input-desc')
  userEvent.click(desc);
  waitFor(() => {
    expect(rows[1].children[0]).toHaveTextContent('Hoth');
    expect(rows[1].children[0]).toHaveTextContent('Dagobah');
  })
  const filter = screen.getAllByTestId('filter')
  expect(button).toBeInTheDocument();
  expect(filter).toHaveLength(2);
  const removeFilters = screen.getByTestId('button-remove-filters');
  userEvent.click(removeFilters);
  expect(filter).not.toBeInTheDocument;
});

test('testa a ordenação', async () => {
  global.fetch = jest.fn().mockResolvedValue({
    json: jest.fn().mockResolvedValue(data)
  });

  render(<App />);
  await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1))
  const asc = screen.getByTestId('column-sort-input-asc')
  const desc = screen.getByTestId('column-sort-input-desc')
  const sort = screen.getByTestId('column-sort')
  const rows = screen.getAllByRole('row');
  userEvent.click(desc);
  userEvent.click(screen.getByText('ORDENAR'));
  waitFor(() => {
    expect(rows[1].children[0]).toHaveTextContent('Coruscant');
  })
  userEvent.click(asc);
  userEvent.click(screen.getByText('ORDENAR'));
  waitFor(() => {
    expect(rows[1].children[0]).toHaveTextContent('Yavin IV');
  })
  userEvent.selectOptions(sort, 'rotation_period');
  userEvent.click(asc);
  userEvent.click(screen.getByText('ORDENAR'));
  waitFor(() => {
    expect(rows[1].children[0]).toHaveTextContent('Bespin');
  })
});

  test('Testa se o filtro usado é excluido e se ao excluir a filtragem o filtro retorna', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(data)
    });

    render(<App />);
    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1))
  const column = screen.getByTestId('column-filter')
  expect(column).toHaveLength(5)
  const teste = screen.getByTestId('button-filter')
  expect(teste).toBeInTheDocument()
  userEvent.click(teste)
  userEvent.click(teste)
  expect(column).toHaveLength(4)
  const teste2 = screen.getAllByText('Excluir')
  expect(teste2).toHaveLength(2)
  userEvent.click(teste2[0])
  expect(column).toHaveLength(5)
  });
