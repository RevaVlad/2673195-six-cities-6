import { render, screen } from '@testing-library/react';
import { BookmarkButton } from './bookmark-button.tsx';
import { BookmarkButtonType, AuthorizationStatus } from '../const';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { NameSpace } from '../const';

vi.mock('react-router-dom', () => ({
  useNavigate: (route: string) => route
}));

vi.mock('../utils/bookmarkButtonUtils', () => ({
  getBookmarkButtonStyle: () => ({
    buttonClass: 'place-card__bookmark-button',
    iconClass: 'place-card__bookmark-icon',
    width: 18,
    height: 19,
  })
}));

vi.mock('../store/apiActions/favouriteActions', () => ({
  changeOfferFavouriteStatus: vi.fn(() => ({
    unwrap: () => Promise.resolve()
  })),
  fetchFavouriteAction: vi.fn()
}));

vi.mock('../store/apiActions/offersActions', () => ({
  fetchOffersAction: vi.fn(),
  fetchOfferAction: vi.fn(),
  fetchNearbyAction: vi.fn()
}));

describe('Component: BookmarkButton', () => {
  const defaultProps = {
    offerId: '1',
    isFavorite: false,
    styleType: BookmarkButtonType.PlaceCard
  };

  const createMockStore = (authStatus: AuthorizationStatus, offerId?: string) => configureStore({
    reducer: {
      [NameSpace.User]: () => ({
        authorizationStatus: authStatus,
        user: null
      }),
      [NameSpace.Offer]: () => ({
        offer: offerId ? { id: offerId } : null
      })
    }
  });

  it('is enabled when user is authorized', () => {
    const store = createMockStore(AuthorizationStatus.Auth, '1');

    render(
      <Provider store={store}>
        <BookmarkButton {...defaultProps} />
      </Provider>
    );

    const button = screen.getByRole('button');
    expect(button).not.toBeDisabled();
  });

  it('renders button with correct attributes when not favorite', () => {
    const store = createMockStore(AuthorizationStatus.Auth, '1');

    render(
      <Provider store={store}>
        <BookmarkButton {...defaultProps} />
      </Provider>
    );

    const button = screen.getByRole('button');
    expect(button).toHaveClass('place-card__bookmark-button button');
    expect(button).not.toHaveClass('place-card__bookmark-button--active');
    expect(button).toHaveAttribute('aria-label', 'Add to favorites');
  });

  it('renders button with correct attributes when favorite', () => {
    const store = createMockStore(AuthorizationStatus.Auth, '1');
    const props = { ...defaultProps, isFavorite: true };

    render(
      <Provider store={store}>
        <BookmarkButton {...props} />
      </Provider>
    );

    const button = screen.getByRole('button');
    expect(button).toHaveClass('place-card__bookmark-button button place-card__bookmark-button--active');
    expect(button).toHaveAttribute('aria-label', 'Remove from favorites');
  });
});
