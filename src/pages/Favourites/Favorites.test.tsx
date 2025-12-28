import { render, screen } from '@testing-library/react';
import { Favourites } from './Favourites';
import { vi } from 'vitest';
import type { Mock } from 'vitest';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { AppRoute, CITIES_LIST } from '../../const.ts';

const mockUseAppDispatch = vi.hoisted<Mock>(() => vi.fn());
const mockUseAppSelector = vi.hoisted<Mock>(() => vi.fn());
const mockFetchFavouriteAction = vi.hoisted<Mock>(() => vi.fn());

const MockNavigation = vi.hoisted(() =>
  vi.fn(() => <div data-testid="navigation">Navigation</div>)
);

const MockCityFavourites = vi.hoisted(() =>
  vi.fn(() => <li data-testid="city-favourites">City Favourites</li>)
);

const MockFavoritesEmpty = vi.hoisted(() =>
  vi.fn(() => <div data-testid="favorites-empty">Favorites Empty</div>)
);

const MockNavigate = vi.hoisted(() =>
  vi.fn(() => <div data-testid="navigate">Navigate</div>)
);

const MockLink = vi.hoisted(() =>
  vi.fn(({ children, to }) => <a href={to} data-testid="link">{children}</a>)
);

vi.mock('../../components/navigation/Navigation.tsx', () => ({
  Navigation: MockNavigation,
}));

vi.mock('./CityFavourites.tsx', () => ({
  CityFavourites: MockCityFavourites,
}));

vi.mock('./FavoritesEmpty.tsx', () => ({
  FavoritesEmpty: MockFavoritesEmpty,
}));

vi.mock('../../hooks/useAppDispatch', () => ({
  useAppDispatch: mockUseAppDispatch,
}));

vi.mock('../../hooks/useAppSelector', () => ({
  useAppSelector: mockUseAppSelector,
}));

vi.mock('../../store/apiActions/favouriteActions.ts', () => ({
  fetchFavouriteAction: mockFetchFavouriteAction,
}));

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom');
  return {
    ...actual,
    Navigate: MockNavigate,
    Link: MockLink,
  };
});

describe('Component: Favourites', () => {
  const mockDispatch = vi.fn();

  const mockFavorites = [
    {
      id: '1',
      title: 'Beautiful Apartment',
      city: { name: 'Paris' },
      isFavorite: true,
    },
    {
      id: '2',
      title: 'Cozy Studio',
      city: { name: 'Paris' },
      isFavorite: true,
    },
    {
      id: '3',
      title: 'Luxury Villa',
      city: { name: 'Amsterdam' },
      isFavorite: true,
    },
  ];

  const renderWithRouter = (component: React.ReactNode) => {
    return render(
      <MemoryRouter initialEntries={['/favorites']}>
        <Routes>
          <Route path="/favorites" element={component} />
          <Route path={AppRoute.NotFound} element={<div data-testid="not-found">Not Found</div>} />
          <Route path={AppRoute.Main} element={<div data-testid="main">Main</div>} />
        </Routes>
      </MemoryRouter>
    );
  };

  beforeEach(() => {
    vi.clearAllMocks();
    mockUseAppDispatch.mockReturnValue(mockDispatch);
    mockUseAppSelector.mockImplementation(() => []);
  });

  it('shows loading when not isLoading', () => {
    mockUseAppSelector.mockReturnValueOnce([])
      .mockReturnValueOnce(false)
      .mockReturnValueOnce(false);

    renderWithRouter(<Favourites />);

    expect(screen.getByText('Загрузка')).toBeInTheDocument();
  });

  it('redirects to not found page on error when loading is true', () => {
    mockUseAppSelector.mockReturnValueOnce([])
      .mockReturnValueOnce(true)
      .mockReturnValueOnce(true);

    renderWithRouter(<Favourites />);

    expect(MockNavigate).toHaveBeenCalledWith({ to: AppRoute.NotFound }, {});
  });

  it('dispatches fetchFavouriteAction on mount when has error and not loading', () => {
    mockUseAppSelector.mockReturnValueOnce([])
      .mockReturnValueOnce(false)
      .mockReturnValueOnce(true);

    renderWithRouter(<Favourites />);

    expect(mockDispatch).toHaveBeenCalledWith(mockFetchFavouriteAction());
  });

  it('does not dispatch fetchFavouriteAction on mount when loading', () => {
    mockUseAppSelector.mockReturnValueOnce([])
      .mockReturnValueOnce(true)
      .mockReturnValueOnce(true);

    renderWithRouter(<Favourites />);

    expect(mockDispatch).not.toHaveBeenCalledWith(mockFetchFavouriteAction());
  });

  it('renders favorites list when there are favorites', () => {
    mockUseAppSelector.mockReturnValueOnce(mockFavorites)
      .mockReturnValueOnce(true)
      .mockReturnValueOnce(false);

    renderWithRouter(<Favourites />);

    expect(screen.getByText('Saved listing')).toBeInTheDocument();
    expect(screen.getByRole('list')).toHaveClass('favorites__list');

    expect(MockCityFavourites).toHaveBeenCalledTimes(CITIES_LIST.length);

    CITIES_LIST.forEach(city => {
      expect(MockCityFavourites).toHaveBeenCalledWith({ cityName: city }, {});
    });
  });

  it('renders FavoritesEmpty when there are no favorites', () => {
    mockUseAppSelector.mockReturnValueOnce([])
      .mockReturnValueOnce(true)
      .mockReturnValueOnce(false);

    renderWithRouter(<Favourites />);

    expect(MockFavoritesEmpty).toHaveBeenCalled();
    expect(screen.queryByText('Saved listing')).not.toBeInTheDocument();
    expect(screen.queryByRole('list')).not.toBeInTheDocument();
  });

  it('renders navigation component', () => {
    mockUseAppSelector.mockReturnValueOnce([])
      .mockReturnValueOnce(true)
      .mockReturnValueOnce(false);

    renderWithRouter(<Favourites />);

    expect(screen.getByTestId('navigation')).toBeInTheDocument();
  });

  it('renders footer with logo link to main page', () => {
    mockUseAppSelector.mockReturnValueOnce([])
      .mockReturnValueOnce(true)
      .mockReturnValueOnce(false);

    renderWithRouter(<Favourites />);

    const footer = screen.getByRole('contentinfo');
    expect(footer).toHaveClass('footer');

    const logoLink = screen.getByTestId('link');
    expect(logoLink).toHaveAttribute('href', AppRoute.Main);

    const logo = screen.getByAltText('6 cities logo');
    expect(logo).toHaveAttribute('src', '/img/logo.svg');
    expect(logo).toHaveAttribute('width', '64');
    expect(logo).toHaveAttribute('height', '33');
  });

  it('has correct page structure classes', () => {
    mockUseAppSelector.mockReturnValueOnce([])
      .mockReturnValueOnce(true)
      .mockReturnValueOnce(false);

    const { container } = renderWithRouter(<Favourites />);

    expect(container.querySelector('.page')).toBeInTheDocument();
    expect(container.querySelector('.page__main--favorites')).toBeInTheDocument();
    expect(container.querySelector('.page__favorites-container')).toBeInTheDocument();
    expect(container.querySelector('.favorites')).toBeInTheDocument();
  });
});
