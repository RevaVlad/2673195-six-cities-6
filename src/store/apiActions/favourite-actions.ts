import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, State} from '../../types/state.ts';
import {AxiosInstance} from 'axios';
import {APIRoute} from '../../const.ts';
import {OffersList} from '../../types/responses/offers/offers-list.ts';
import {OfferDto} from '../../types/responses/offers/offer-dto.ts';

export const fetchFavouriteAction = createAsyncThunk<OffersList, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchFavourite',
  async (_, {extra: api}) => {
    const {data} = await api.get<OffersList>(APIRoute.Favourite);
    return data;
  },
);

export const changeOfferFavouriteStatus = createAsyncThunk<OfferDto, {offerId: string; newIsFavorite: boolean}, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/changeFavouriteStatus',
  async ({offerId, newIsFavorite}, {extra: api}) => {
    const {data} = await api.post<OfferDto>(APIRoute.ChangeFavouriteStatus(offerId, newIsFavorite ? 1 : 0));
    return data;
  },
);
