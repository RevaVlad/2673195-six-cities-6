import { offerData, clearOffer } from './offer-slice.ts';
import { fetchOfferAction, fetchNearbyAction } from '../../apiActions/offers-actions.ts';
import {
  getFilteredNearbyOffers,
  getNearbyPoints,
  getOfferCity
} from './offer-selectors.ts';
import { NameSpace } from '../../../const';
import { OfferDto } from '../../../types/responses/offers/offer-dto.ts';
import { OffersList, OffersListItem } from '../../../types/responses/offers/offers-list.ts';
import { Location } from '../../../types/location';
import { CityDto } from '../../../types/responses/city-dto.ts';
import { UserCompactDto } from '../../../types/responses/user-compact-dto.ts';

const createMockLocation = (overrides?: Partial<Location>): Location => ({
  latitude: 48.85661,
  longitude: 2.351499,
  zoom: 13,
  ...overrides
});

const createMockCityDto = (overrides?: Partial<CityDto>): CityDto => ({
  name: 'Paris',
  location: createMockLocation(),
  ...overrides
});

const createMockUserCompactDto = (overrides?: Partial<UserCompactDto>): UserCompactDto => ({
  name: 'John Doe',
  avatarUrl: 'avatar.jpg',
  isPro: true,
  ...overrides
});

const createMockOfferDto = (overrides?: Partial<OfferDto>): OfferDto => ({
  id: '1',
  title: 'Beautiful & luxurious apartment at great location',
  type: 'apartment',
  price: 120,
  city: createMockCityDto({ name: 'Paris' }),
  location: createMockLocation({
    latitude: 48.865610000000004,
    longitude: 2.350499,
    zoom: 16
  }),
  isFavorite: true,
  isPremium: true,
  rating: 4.8,
  description: 'Test description',
  bedrooms: 3,
  goods: ['Wi-Fi', 'Kitchen'],
  host: createMockUserCompactDto(),
  images: ['img1.jpg', 'img2.jpg'],
  maxAdults: 4,
  ...overrides
});

const createMockOffersListItem = (overrides?: Partial<OffersListItem>): OffersListItem => ({
  id: '1',
  title: 'Beautiful & luxurious apartment at great location',
  type: 'apartment',
  price: 120,
  city: createMockCityDto({ name: 'Paris' }),
  location: createMockLocation({
    latitude: 48.865610000000004,
    longitude: 2.350499,
    zoom: 16
  }),
  isFavorite: true,
  isPremium: true,
  rating: 4.8,
  previewImage: 'img/apartment-01.jpg',
  ...overrides
});

describe('Offer Slice', () => {
  const mockOffer = createMockOfferDto();
  const mockNearbyOffers: OffersList = [
    createMockOffersListItem({ id: '2' }),
    createMockOffersListItem({ id: '3' }),
    createMockOffersListItem({ id: '4' }),
  ];

  describe('initial state', () => {
    it('returns initial state', () => {
      const result = offerData.reducer(undefined, { type: '' });
      expect(result).toEqual({
        offer: null,
        nearby: [],
        isLoading: false,
        hasError: false,
        nearbyLoading: false,
        nearbyHasError: false,
        lastFetchedId: null,
      });
    });
  });

  describe('reducers', () => {
    it('handles clearOffer action', () => {
      const stateWithData = {
        offer: mockOffer,
        nearby: mockNearbyOffers,
        isLoading: true,
        hasError: false,
        nearbyLoading: true,
        nearbyHasError: false,
        lastFetchedId: '1',
      };

      const result = offerData.reducer(stateWithData, clearOffer());
      expect(result).toEqual({
        offer: null,
        nearby: [],
        isLoading: false,
        hasError: false,
        nearbyLoading: false,
        nearbyHasError: false,
        lastFetchedId: null,
      });
    });
  });

  describe('extraReducers', () => {
    describe('fetchOfferAction', () => {
      it('handles fetchOfferAction.pending', () => {
        const initialState = {
          offer: null,
          nearby: [],
          isLoading: false,
          hasError: true,
          nearbyLoading: false,
          nearbyHasError: false,
          lastFetchedId: null,
        };

        const action = {
          type: fetchOfferAction.pending.type,
          meta: { arg: '1' }
        };
        const result = offerData.reducer(initialState, action);

        expect(result.lastFetchedId).toBe('1');
        expect(result.isLoading).toBe(true);
        expect(result.hasError).toBe(false);
      });

      it('handles fetchOfferAction.fulfilled', () => {
        const loadingState = {
          offer: null,
          nearby: [],
          isLoading: true,
          hasError: false,
          nearbyLoading: false,
          nearbyHasError: false,
          lastFetchedId: '1',
        };

        const action = {
          type: fetchOfferAction.fulfilled.type,
          payload: mockOffer,
          meta: { arg: '1' }
        };
        const result = offerData.reducer(loadingState, action);

        expect(result.offer).toEqual(mockOffer);
        expect(result.isLoading).toBe(false);
        expect(result.hasError).toBe(false);
      });

      it('handles fetchOfferAction.rejected when IDs match', () => {
        const loadingState = {
          offer: mockOffer,
          nearby: [],
          isLoading: true,
          hasError: false,
          nearbyLoading: false,
          nearbyHasError: false,
          lastFetchedId: '1',
        };

        const action = {
          type: fetchOfferAction.rejected.type,
          meta: { arg: '1' }
        };
        const result = offerData.reducer(loadingState, action);

        expect(result.isLoading).toBe(false);
        expect(result.hasError).toBe(true);
        expect(result.offer).toBeNull();
      });

      it('does not handle fetchOfferAction.rejected when IDs do not match', () => {
        const loadingState = {
          offer: mockOffer,
          nearby: [],
          isLoading: true,
          hasError: false,
          nearbyLoading: false,
          nearbyHasError: false,
          lastFetchedId: '1',
        };

        const action = {
          type: fetchOfferAction.rejected.type,
          meta: { arg: '2' }
        };
        const result = offerData.reducer(loadingState, action);

        expect(result.isLoading).toBe(true);
        expect(result.hasError).toBe(false);
        expect(result.offer).toBe(mockOffer);
      });
    });

    describe('fetchNearbyAction', () => {
      it('handles fetchNearbyAction.pending', () => {
        const initialState = {
          offer: mockOffer,
          nearby: [],
          isLoading: false,
          hasError: false,
          nearbyLoading: false,
          nearbyHasError: true,
          lastFetchedId: '1',
        };

        const action = { type: fetchNearbyAction.pending.type };
        const result = offerData.reducer(initialState, action);

        expect(result.nearbyLoading).toBe(true);
        expect(result.nearbyHasError).toBe(false);
      });

      it('handles fetchNearbyAction.fulfilled', () => {
        const loadingState = {
          offer: mockOffer,
          nearby: [],
          isLoading: false,
          hasError: false,
          nearbyLoading: true,
          nearbyHasError: false,
          lastFetchedId: '1',
        };

        const action = {
          type: fetchNearbyAction.fulfilled.type,
          payload: mockNearbyOffers,
        };
        const result = offerData.reducer(loadingState, action);

        expect(result.nearby).toEqual(mockNearbyOffers);
        expect(result.nearbyLoading).toBe(false);
        expect(result.nearbyHasError).toBe(false);
      });

      it('handles fetchNearbyAction.rejected', () => {
        const loadingState = {
          offer: mockOffer,
          nearby: mockNearbyOffers,
          isLoading: false,
          hasError: false,
          nearbyLoading: true,
          nearbyHasError: false,
          lastFetchedId: '1',
        };

        const action = { type: fetchNearbyAction.rejected.type };
        const result = offerData.reducer(loadingState, action);

        expect(result.nearbyLoading).toBe(false);
        expect(result.nearbyHasError).toBe(true);
        expect(result.nearby).toEqual([]);
      });
    });
  });
});

describe('Offer Selectors', () => {
  const createMockState = (offer: OfferDto | null, nearby: OffersList) => ({
    [NameSpace.Offer]: {
      isLoading: false,
      hasError: false,
      nearbyLoading: false,
      nearbyHasError: false,
      lastFetchedId: null,
      offer: offer,
      nearby: nearby,
    }
  });

  describe('getFilteredNearbyOffers', () => {
    it('filters out current offer from nearby offers', () => {
      const mockOffer = createMockOfferDto({ id: '1' });
      const mockNearbyOffers: OffersList = [
        createMockOffersListItem({ id: '1' }),
        createMockOffersListItem({ id: '2' }),
        createMockOffersListItem({ id: '3' }),
      ];

      const state = createMockState(
        mockOffer,
        mockNearbyOffers,
      );

      const result = getFilteredNearbyOffers(state);
      expect(result).toHaveLength(2);
      expect(result[0].id).toBe('2');
      expect(result[1].id).toBe('3');
    });

    it('returns all nearby offers when no current offer', () => {
      const mockNearbyOffers: OffersList = [
        createMockOffersListItem({ id: '1' }),
        createMockOffersListItem({ id: '2' }),
      ];

      const state = createMockState(
        null,
        mockNearbyOffers,
      );

      const result = getFilteredNearbyOffers(state);
      expect(result).toHaveLength(2);
    });

    it('returns empty array when no nearby offers', () => {
      const mockOffer = createMockOfferDto({ id: '1' });
      const state = createMockState(
        mockOffer,
        [],
      );

      const result = getFilteredNearbyOffers(state);
      expect(result).toEqual([]);
    });
  });

  describe('getNearbyPoints', () => {
    it('returns points for nearby offers including current offer', () => {
      const mockOffer = createMockOfferDto({
        id: '1',
        location: createMockLocation({ latitude: 1, longitude: 2, zoom: 13 })
      });
      const mockNearbyOffers: OffersList = [
        createMockOffersListItem({
          id: '2',
          location: createMockLocation({ latitude: 3, longitude: 4, zoom: 13 })
        }),
        createMockOffersListItem({
          id: '3',
          location: createMockLocation({ latitude: 5, longitude: 6, zoom: 13 })
        }),
      ];

      const state = createMockState(
        mockOffer,
        mockNearbyOffers,
      );

      const result = getNearbyPoints(state);
      expect(result).toHaveLength(3);
      expect(result).toContainEqual(createMockLocation({ latitude: 1, longitude: 2, zoom: 13 }));
      expect(result).toContainEqual(createMockLocation({ latitude: 3, longitude: 4, zoom: 13 }));
      expect(result).toContainEqual(createMockLocation({ latitude: 5, longitude: 6, zoom: 13 }));
    });

    it('returns only nearby points when no current offer', () => {
      const mockNearbyOffers: OffersList = [
        createMockOffersListItem({
          id: '2',
          location: createMockLocation({ latitude: 3, longitude: 4, zoom: 13 })
        }),
      ];

      const state = createMockState(
        null,
        mockNearbyOffers,
      );

      const result = getNearbyPoints(state);
      expect(result).toHaveLength(1);
      expect(result[0]).toEqual(createMockLocation({ latitude: 3, longitude: 4, zoom: 13 }));
    });
  });

  describe('getOfferCity', () => {
    it('returns city when offer exists', () => {
      const mockCity = createMockCityDto({
        name: 'Paris',
        location: createMockLocation({ latitude: 1, longitude: 2, zoom: 13 })
      });
      const mockOffer = createMockOfferDto({ city: mockCity });

      const state = createMockState(
        mockOffer,
        []
      );

      const result = getOfferCity(state);
      expect(result).toEqual(mockCity);
    });

    it('returns null when no offer', () => {
      const state = createMockState(
        null,
        []
      );

      const result = getOfferCity(state);
      expect(result).toBeNull();
    });
  });
});
