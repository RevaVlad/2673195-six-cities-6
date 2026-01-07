import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import { NavigationLogin } from './navigation-login.tsx';

describe('NavigationLogin Component (minimal)', () => {
  it('should render sign in link', () => {
    render(
      <MemoryRouter>
        <NavigationLogin />
      </MemoryRouter>
    );

    expect(screen.getByRole('link', { name: 'Sign in' })).toBeInTheDocument();
  });
});
