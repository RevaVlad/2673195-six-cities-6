import { render, screen } from '@testing-library/react';
import { FavoritesEmpty } from './FavoritesEmpty';

describe('Component: FavoritesEmpty', () => {
  it('renders correctly', () => {
    render(<FavoritesEmpty />);

    expect(screen.getByText('Favorites (empty)')).toBeInTheDocument();
    expect(screen.getByText('Nothing yet saved.')).toBeInTheDocument();
    expect(screen.getByText('Save properties to narrow down search or plan your future trips.')).toBeInTheDocument();
  });
});
