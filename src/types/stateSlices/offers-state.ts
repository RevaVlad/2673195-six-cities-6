import {OffersList} from '../responses/offers/offers-list.ts';

export type OffersState = {
  offers: OffersList;
  isOffersDataLoading: boolean;
  hasError: boolean;
};
