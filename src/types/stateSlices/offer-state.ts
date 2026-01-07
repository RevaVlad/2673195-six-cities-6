import {OfferDto} from '../responses/offers/offer-dto.ts';
import {OffersNearbyDto} from '../responses/offers/offers-nearby-dto.ts';

export interface OfferState {
  offer: OfferDto | null;
  nearby: OffersNearbyDto;
  isLoading: boolean;
  hasError: boolean;
  nearbyLoading: boolean;
  nearbyHasError: boolean;
  lastFetchedId: string | null;
}
