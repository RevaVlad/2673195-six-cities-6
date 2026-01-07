import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import {MemoryRouter} from 'react-router-dom';
import { NotFoundPage } from './not-found-page.tsx';

describe('NotFoundPage with RouterProvider', () => {
  const renderWithRouter = () => render(
    <MemoryRouter>
      <NotFoundPage />
    </MemoryRouter>
  );

  it('should render 404 page for non-existent routes', () => {
    renderWithRouter();

    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByText('Извините, странице по такому адресу не найдена')).toBeInTheDocument();
  });
});
