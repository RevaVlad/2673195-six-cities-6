import {State} from '../../../types/state.ts';
import {NameSpace} from '../../../const.ts';
import {createSelector} from '@reduxjs/toolkit';
import {getCityName} from '../city/city-selectors.ts';

const getOffers = (state: Pick<State, NameSpace.Offers>) =>
  state[NameSpace.Offers].offers;

export const getOffersInCity = createSelector(
  [getOffers, getCityName],
  (offers, city) =>
    offers.filter((x) => x.city.name === city)
);

export const getOffersLoadingStatus = (state: Pick<State, NameSpace.Offers>): boolean =>
  state[NameSpace.Offers].isOffersDataLoading;

export const getOffersErrorStatus = (state: Pick<State, NameSpace.Offers>): boolean =>
  state[NameSpace.Offers].hasError;
