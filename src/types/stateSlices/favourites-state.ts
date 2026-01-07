import {OffersList} from '../responses/offers/offers-list.ts';

export type FavouritesState = {
  favourites: OffersList;
  isFavouritesDataLoading: boolean;
  hasError: boolean;
};
