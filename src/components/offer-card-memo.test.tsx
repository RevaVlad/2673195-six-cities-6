import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { OfferCardMemo } from './offer-card-memo.tsx';
import type { OfferCompactDto } from '../types/responses/offers/offer-compact-dto.ts';
import type { OffersListItem } from '../types/responses/offers/offers-list.ts';
import { OfferCardStyle } from '../const';

vi.mock('./bookmark-button', () => ({
  BookmarkButton: () => <button data-testid="bookmark-button">Bookmark</button>
}));

const createMockOffer = () : OfferCompactDto | OffersListItem => ({
  id: '1',
  title: 'Beautiful & luxurious apartment at great location',
  type: 'apartment',
  price: 120,
  city: {
    name: 'Paris',
    location: { latitude: 48.85661, longitude: 2.351499, zoom: 13 }
  },
  location: { latitude: 48.86561, longitude: 2.350499, zoom: 16 },
  isFavorite: true,
  isPremium: true,
  rating: 4.8,
  previewImage: 'img/apartment-01.jpg'
});

describe('Component: OfferCardMemo', () => {
  const mockOffer = createMockOffer();
  const mockOnMouseEnter = vi.fn();
  const mockOnMouseLeave = vi.fn();

  const renderComponent = () => render(
    <MemoryRouter>
      <OfferCardMemo
        offer={mockOffer}
        cardType={OfferCardStyle.City}
        onMouseEnter={mockOnMouseEnter}
        onMouseLeave={mockOnMouseLeave}
      />
    </MemoryRouter>
  );

  it('renders offer information correctly', () => {
    renderComponent();
    expect(screen.getByText(mockOffer.title)).toBeInTheDocument();
    expect(screen.getByText(`€${mockOffer.price}`)).toBeInTheDocument();
    expect(screen.getByText(mockOffer.type)).toBeInTheDocument();
    expect(screen.getByText('Premium')).toBeInTheDocument();
    expect(screen.getByAltText('Place image')).toHaveAttribute('src', mockOffer.previewImage);
  });

  it('calls onMouseEnter when mouse enters the card', async () => {
    const user = userEvent.setup();
    renderComponent();

    const article = screen.getByRole('article');
    await user.hover(article);

    expect(mockOnMouseEnter).toHaveBeenCalledWith(mockOffer.id);
  });

  it('calls onMouseLeave when mouse leaves the card', async () => {
    const user = userEvent.setup();
    renderComponent();

    const article = screen.getByRole('article');
    await user.hover(article);
    await user.unhover(article);

    expect(mockOnMouseLeave).toHaveBeenCalled();
  });
});
