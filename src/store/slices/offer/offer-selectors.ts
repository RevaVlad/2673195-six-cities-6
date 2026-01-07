import { createSelector } from '@reduxjs/toolkit';
import { State } from '../../../types/state.ts';
import { NameSpace } from '../../../const.ts';

export const getOffer = (state: Pick<State, NameSpace.Offer>) =>
  state[NameSpace.Offer].offer;

export const getNearbyOffers = (state: Pick<State, NameSpace.Offer>) =>
  state[NameSpace.Offer].nearby;

export const getOfferLoadingStatus = (state: Pick<State, NameSpace.Offer>): boolean =>
  state[NameSpace.Offer].isLoading;

export const getOfferErrorStatus = (state: Pick<State, NameSpace.Offer>): boolean =>
  state[NameSpace.Offer].hasError;

export const getNearbyLoadingStatus = (state: Pick<State, NameSpace.Offer>): boolean =>
  state[NameSpace.Offer].nearbyLoading;

export const getNearbyErrorStatus = (state: Pick<State, NameSpace.Offer>): boolean =>
  state[NameSpace.Offer].nearbyHasError;

export const getFilteredNearbyOffers = createSelector(
  [getOffer, getNearbyOffers],
  (offer, nearby) => {
    if (!offer) {
      return nearby;
    }
    return nearby.filter((nearbyOffer) => nearbyOffer.id !== offer.id);
  }
);

export const getNearbyPoints = createSelector(
  [getOffer, getFilteredNearbyOffers],
  (offer, nearby) => {
    const points = nearby.map((x) => x.location);

    if (offer) {
      points.push(offer.location);
    }

    return points;
  }
);

export const getOfferCity = createSelector(
  [getOffer],
  (offer) => offer?.city || null
);
