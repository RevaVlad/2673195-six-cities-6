import {createAsyncThunk} from '@reduxjs/toolkit';
import {OffersList} from '../../types/responses/offers/offers-list.ts';
import {AppDispatch, State} from '../../types/state.ts';
import {AxiosInstance} from 'axios';
import {APIRoute} from '../../const.ts';
import {OfferDto} from '../../types/responses/offers/offer-dto.ts';
import {OffersNearbyDto} from '../../types/responses/offers/offers-nearby-dto.ts';

export const fetchOffersAction = createAsyncThunk<OffersList, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchOffers',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<OffersList>(APIRoute.Offers);
    return data;
  },
);

export const fetchNearbyAction = createAsyncThunk<OffersNearbyDto, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchOffersNearby',
  async (id, {extra: api}) => {
    const {data} = await api.get<OffersNearbyDto>(APIRoute.OffersNearby(id));
    return data;
  },
);

export const fetchOfferAction = createAsyncThunk<OfferDto, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchOffer',
  async (id, {extra: api}) => {
    const {data} = await api.get<OfferDto>(APIRoute.Offer(id));
    return data;
  },
);
