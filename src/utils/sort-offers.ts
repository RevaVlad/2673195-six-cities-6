import { OffersList } from '../types/responses/offers/offers-list.ts';
import { SortType } from '../const.ts';

export const sortOffers = (offers: OffersList, sortType: SortType): OffersList => {
  const offersCopy = [...offers];

  switch (sortType) {
    case SortType.PriceLowToHigh:
      return offersCopy.sort((a, b) => a.price - b.price);
    case SortType.PriceHighToLow:
      return offersCopy.sort((a, b) => b.price - a.price);
    case SortType.TopRatedFirst:
      return offersCopy.sort((a, b) => b.rating - a.rating);
    case SortType.Popular:
    default:
      return offersCopy;
  }
};
