import { render, screen } from '@testing-library/react';
import { Navigation } from './navigation.tsx';
import { AuthorizationStatus } from '../../const';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';
import {useAppSelector} from '../../hooks/use-app-selector.ts';

vi.mock('../../hooks/use-app-selector', () => ({
  useAppSelector: vi.fn(),
}));

vi.mock('./navigation-profile', () => ({
  NavigationProfile: () => <li data-testid="navigation-profile">Profile</li>,
}));

vi.mock('./navigation-login', () => ({
  NavigationLogin: () => <li data-testid="navigation-login">Login</li>,
}));

describe('Component: Navigation', () => {
  const mockUseAppSelector = vi.mocked(useAppSelector);

  beforeEach(() => {
    mockUseAppSelector.mockClear();
  });

  const renderComponent = (authStatus: AuthorizationStatus) => {
    mockUseAppSelector.mockReturnValue(authStatus);

    return render(
      <MemoryRouter>
        <Navigation />
      </MemoryRouter>
    );
  };

  it('renders logo with correct link', () => {
    renderComponent(AuthorizationStatus.Unknown);

    const logoLink = screen.getByRole('link', { name: '6 cities logo' });
    expect(logoLink).toBeInTheDocument();
    expect(logoLink).toHaveAttribute('href', '/');
    expect(screen.getByAltText('6 cities logo')).toHaveAttribute('src', '/img/logo.svg');
  });

  it('renders NavigationProfile when user is authorized', () => {
    renderComponent(AuthorizationStatus.Auth);

    expect(screen.getByTestId('navigation-profile')).toBeInTheDocument();
    expect(screen.queryByTestId('navigation-login')).not.toBeInTheDocument();
  });

  it('renders NavigationLogin when user is not authorized', () => {
    renderComponent(AuthorizationStatus.NotAuth);

    expect(screen.getByTestId('navigation-login')).toBeInTheDocument();
    expect(screen.queryByTestId('navigation-profile')).not.toBeInTheDocument();
  });

  it('renders NavigationLogin when authorization status is unknown', () => {
    renderComponent(AuthorizationStatus.Unknown);

    expect(screen.getByTestId('navigation-login')).toBeInTheDocument();
    expect(screen.queryByTestId('navigation-profile')).not.toBeInTheDocument();
  });

  it('has correct header structure', () => {
    renderComponent(AuthorizationStatus.Auth);

    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByRole('navigation')).toBeInTheDocument();
    expect(screen.getByRole('list')).toBeInTheDocument();
  });
});
