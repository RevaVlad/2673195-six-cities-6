import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { OffersListComponent } from './offers-list-component.tsx';
import { OfferCardStyle } from '../const';
import { OffersListItem } from '../types/responses/offers/offers-list.ts';
import { MemoryRouter } from 'react-router-dom';
import {OfferCompactDto} from '../types/responses/offers/offer-compact-dto.ts';

const createMockOffer = (id: string): OffersListItem => ({
  id,
  title: `Test Offer ${id}`,
  type: 'apartment',
  price: 100,
  city: {
    name: 'Paris',
    location: { latitude: 48.85661, longitude: 2.351499, zoom: 13 }
  },
  location: { latitude: 48.85661, longitude: 2.351499, zoom: 13 },
  isFavorite: false,
  isPremium: false,
  rating: 4.5,
  previewImage: `img${id}.jpg`
});

vi.mock('./offer-card-memo', () => ({
  OfferCardMemo: vi.fn(({ offer, onMouseEnter, onMouseLeave } :
                        {
                          offer: OfferCompactDto | OffersListItem;
                          onMouseEnter: (offerId: string) => void;
                          onMouseLeave: () => void;
                        }
  ) => (
    <article
      data-testid="offer-card"
      onMouseEnter={() => onMouseEnter(offer.id)}
      onMouseLeave={onMouseLeave}
    >
      {offer.title}
    </article>
  ))
}));

describe('Component: OffersListComponent', () => {
  const mockOffers = [createMockOffer('1'), createMockOffer('2')];
  const mockOnActivePointChange = vi.fn();

  const renderComponent = () => render(
    <MemoryRouter>
      <OffersListComponent
        offers={mockOffers}
        cardStyle={OfferCardStyle.City}
        onActivePointChange={mockOnActivePointChange}
      />
    </MemoryRouter>
  );

  it('renders all offers', () => {
    renderComponent();
    expect(screen.getAllByTestId('offer-card')).toHaveLength(2);
  });

  it('applies correct class name for City card style', () => {
    const { container } = renderComponent();
    expect(container.querySelector('.cities__places-list')).toBeInTheDocument();
  });

  it('calls onActivePointChange with correct location on mouse enter', async () => {
    const user = userEvent.setup();
    renderComponent();

    const articles = screen.getAllByTestId('offer-card');
    await user.hover(articles[0]);

    expect(mockOnActivePointChange).toHaveBeenCalledWith(mockOffers[0].location);
  });

  it('calls onActivePointChange with null on mouse leave', async () => {
    const user = userEvent.setup();
    renderComponent();

    const articles = screen.getAllByTestId('offer-card');
    await user.hover(articles[0]);
    await user.unhover(articles[0]);

    expect(mockOnActivePointChange).toHaveBeenCalledWith(null);
  });
});
