import {State} from '../../../types/state.ts';
import {NameSpace} from '../../../const.ts';
import {OffersList} from '../../../types/responses/offers/offers-list.ts';
import {createSelector} from '@reduxjs/toolkit';

export const getFavourites = (state: Pick<State, NameSpace.Favourites>): OffersList =>
  state[NameSpace.Favourites].favourites;

export const getFavouritesInCity = createSelector(
  [getFavourites, (_state: Pick<State, NameSpace.Favourites>, city: string) => city],
  (favourites, city) => favourites.filter((x) => x.city.name === city)
);

export const getFavouritesLoadingStatus = (state: Pick<State, NameSpace.Favourites>):
   boolean => state[NameSpace.Favourites].isFavouritesDataLoading;

export const getFavouritesErrorStatus = (state: Pick<State, NameSpace.Favourites>):
  boolean => state[NameSpace.Favourites].hasError;
