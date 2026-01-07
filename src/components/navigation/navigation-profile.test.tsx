import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import { NavigationLogIn } from './navigation-logIn.tsx';

describe('NavigationLogIn Component (minimal)', () => {
  it('should render sign in link', () => {
    render(
      <MemoryRouter>
        <NavigationLogIn />
      </MemoryRouter>
    );

    expect(screen.getByRole('link', { name: 'Sign in' })).toBeInTheDocument();
  });
});
