import { render, screen } from '@testing-library/react';
import { Main } from './Main';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';
import { OffersList } from '../../types/responses/offers/offersList.ts';
import {ReactNode} from 'react';

const mockUseAppSelector = vi.hoisted(() => vi.fn());
const mockNavigate = vi.hoisted(() => vi.fn());

const MockNavigate = vi.hoisted(() => ({ to }: { to: string }) => {
  mockNavigate(to);
  return null;
});

vi.mock('../../hooks/useAppSelector', () => ({
  useAppSelector: mockUseAppSelector,
}));

vi.mock('react-router-dom', () => ({
  Navigate: MockNavigate,
  MemoryRouter: ({ children }: { children: ReactNode }) => <div>{children}</div>,
  useNavigate: () => vi.fn(),
  Link: ({ children, to }: { children: ReactNode; to: string }) => <a href={to}>{children}</a>,
}));

vi.mock('../../components/navigation/Navigation.tsx', () => ({
  Navigation: () => <div>Navigation</div>,
}));

vi.mock('./Tabs.tsx', () => ({
  Tabs: ({ activeCity }: { activeCity: string }) => <div>Tabs: {activeCity}</div>,
}));

vi.mock('./CitiesPlaces.tsx', () => ({
  default: ({ city, offers }: { city: string; offers: OffersList }) => (
    <div>CitiesPlaces: {city}, Offers: {offers.length}</div>
  ),
}));

vi.mock('./MainEmpty.tsx', () => ({
  MainEmpty: () => <div>No places available</div>,
}));

vi.mock('../../components/Spinner.tsx', () => ({
  Spinner: () => <div>Loading...</div>,
}));

vi.mock('../../hocs/SortContext.tsx', () => ({
  SortProvider: ({ children }: { children: ReactNode }) => <div>{children}</div>,
}));

describe('Component: Main', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('shows spinner when loading', () => {
    mockUseAppSelector
      .mockReturnValueOnce(true)
      .mockReturnValueOnce(false)
      .mockReturnValueOnce('Paris')
      .mockReturnValueOnce([]);

    render(
      <MemoryRouter>
        <Main />
      </MemoryRouter>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('navigates to error page on error', () => {
    mockUseAppSelector
      .mockReturnValueOnce(false)
      .mockReturnValueOnce(true)
      .mockReturnValueOnce('Paris')
      .mockReturnValueOnce([]);

    render(
      <MemoryRouter>
        <Main />
      </MemoryRouter>
    );

    expect(mockNavigate).toHaveBeenCalledWith('/*');
  });

  it('shows CitiesPlaces when offers exist', () => {
    const mockOffers = [{ id: 1 }, { id: 2 }];

    mockUseAppSelector
      .mockReturnValueOnce(false)
      .mockReturnValueOnce(false)
      .mockReturnValueOnce('Paris')
      .mockReturnValueOnce(mockOffers);

    render(
      <MemoryRouter>
        <Main />
      </MemoryRouter>
    );

    expect(screen.getByText(`CitiesPlaces: Paris, Offers: ${mockOffers.length}`)).toBeInTheDocument();
  });

  it('shows MainEmpty when no offers', () => {
    mockUseAppSelector
      .mockReturnValueOnce(false)
      .mockReturnValueOnce(false)
      .mockReturnValueOnce('Paris')
      .mockReturnValueOnce([]);

    render(
      <MemoryRouter>
        <Main />
      </MemoryRouter>
    );

    expect(screen.getByText('No places available')).toBeInTheDocument();
  });
});
