import { render, screen } from '@testing-library/react';
import { NavigationProfile } from './navigation-profile.tsx';
import { MemoryRouter } from 'react-router-dom';

vi.mock('./navigation-profile', () => ({
  NavigationProfile: () => (
    <li data-testid="navigation-profile">
      <a href="/profile">Profile</a>
    </li>
  ),
}));

describe('Component: NavigationProfile', () => {
  const renderComponent = () => render(
    <MemoryRouter>
      <NavigationProfile />
    </MemoryRouter>
  );

  it('renders profile link', () => {
    renderComponent();

    expect(screen.getByTestId('navigation-profile')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Profile' })).toHaveAttribute('href', '/profile');
  });
});
