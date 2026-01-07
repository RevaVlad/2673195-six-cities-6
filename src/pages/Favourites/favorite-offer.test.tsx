import { render, screen } from '@testing-library/react';
import { FavouriteOffer } from './favourite-offer.tsx';
import { vi } from 'vitest';
import { AppRoute } from '../../const.ts';
import type { OffersListItem } from '../../types/responses/offers/offers-list.ts';

const MockBookmarkButton = vi.hoisted(() =>
  vi.fn(() => <button data-testid="bookmark-button">Bookmark</button>)
);

vi.mock('../../components/bookmark-button.tsx', () => ({
  BookmarkButton: MockBookmarkButton,
}));

describe('Component: FavouriteOffer', () => {
  const mockOffer: OffersListItem = {
    id: '1',
    title: 'Beautiful Apartment in Paris',
    type: 'apartment',
    price: 120,
    rating: 4.5,
    previewImage: 'image1.jpg',
    isPremium: true,
    isFavorite: true,
    city: {
      name: 'Paris',
      location: {
        latitude: 48.8566,
        longitude: 2.3522,
        zoom: 12
      }
    },
    location: {
      latitude: 48.8566,
      longitude: 2.3522,
      zoom: 12
    }
  };

  const mockOfferLink = AppRoute.Offer(mockOffer.id);

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders all offer details correctly', () => {
    render(<FavouriteOffer offer={mockOffer} />);

    expect(screen.getByText(`€${mockOffer.price}`)).toBeInTheDocument();
    expect(screen.getByText('/ night')).toBeInTheDocument();
    expect(screen.getByText(mockOffer.title)).toBeInTheDocument();
    expect(screen.getByText(mockOffer.type)).toBeInTheDocument();

    const image = screen.getByAltText('Place image');
    expect(image).toHaveAttribute('src', mockOffer.previewImage);
    expect(image).toHaveAttribute('width', '150');
    expect(image).toHaveAttribute('height', '110');

    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(2);

    links.forEach((link) => {
      expect(link).toHaveAttribute('href', mockOfferLink);
    });
  });

  it('renders with correct classes and structure', () => {
    const { container } = render(<FavouriteOffer offer={mockOffer} />);

    // Проверяем структуру классов
    expect(container.querySelector('.favorites__card')).toBeInTheDocument();
    expect(container.querySelector('.place-card')).toBeInTheDocument();
    expect(container.querySelector('.favorites__image-wrapper')).toBeInTheDocument();
    expect(container.querySelector('.favorites__card-info')).toBeInTheDocument();

    const ratingStars = container.querySelector('.place-card__stars');
    expect(ratingStars).toBeInTheDocument();
    expect(ratingStars?.querySelector('span')).toHaveStyle({ width: '80%' });

    expect(screen.getByText('Rating')).toHaveClass('visually-hidden');
  });

  it('renders different offer types correctly', () => {
    const roomOffer: OffersListItem = {
      ...mockOffer,
      type: 'room',
      price: 80,
      title: 'Cozy Room'
    };

    render(<FavouriteOffer offer={roomOffer} />);

    expect(screen.getByText('room')).toBeInTheDocument();
    expect(screen.getByText('€80')).toBeInTheDocument();
    expect(screen.getByText('Cozy Room')).toBeInTheDocument();
  });

  it('generates correct offer link', () => {
    render(<FavouriteOffer offer={mockOffer} />);

    const links = screen.getAllByRole('link');
    links.forEach((link) => {
      expect(link).toHaveAttribute('href', AppRoute.Offer(mockOffer.id));
    });
  });

  it('has correct HTML semantics', () => {
    const { container } = render(<FavouriteOffer offer={mockOffer} />);

    expect(container.querySelector('article')).toBeInTheDocument();
    expect(container.querySelector('h2')).toBeInTheDocument();
    expect(container.querySelector('img')).toBeInTheDocument();
  });

  it('handles offer without premium status', () => {
    const nonPremiumOffer: OffersListItem = {
      ...mockOffer,
      isPremium: false
    };

    const { container } = render(<FavouriteOffer offer={nonPremiumOffer} />);
    expect(container).toBeInTheDocument();
  });
});
