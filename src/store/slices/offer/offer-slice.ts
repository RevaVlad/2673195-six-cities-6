import {createSlice} from '@reduxjs/toolkit';
import {NameSpace} from '../../../const.ts';
import {fetchNearbyAction, fetchOfferAction} from '../../apiActions/offers-actions.ts';
import {OfferState} from '../../../types/stateSlices/offer-state.ts';

const initialState: OfferState = {
  offer: null,
  nearby: [],
  isLoading: false,
  hasError: false,
  nearbyLoading: false,
  nearbyHasError: false,
  lastFetchedId: null,
};

export const offerData = createSlice({
  name: NameSpace.Offer,
  initialState,
  reducers: {
    clearOffer: (state) => {
      state.offer = null;
      state.nearby = [];
      state.isLoading = false;
      state.hasError = false;
      state.nearbyLoading = false;
      state.nearbyHasError = false;
      state.lastFetchedId = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOfferAction.pending, (state, action) => {
        state.lastFetchedId = action.meta.arg;
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(fetchOfferAction.fulfilled, (state, action) => {
        state.offer = action.payload;
        state.isLoading = false;
        state.hasError = false;
      })
      .addCase(fetchOfferAction.rejected, (state, action) => {
        if (state.lastFetchedId === action.meta.arg) {
          state.isLoading = false;
          state.hasError = true;
          state.offer = null;
        }
      });

    builder
      .addCase(fetchNearbyAction.pending, (state) => {
        state.nearbyLoading = true;
        state.nearbyHasError = false;
      })
      .addCase(fetchNearbyAction.fulfilled, (state, action) => {
        state.nearby = action.payload;
        state.nearbyLoading = false;
        state.nearbyHasError = false;
      })
      .addCase(fetchNearbyAction.rejected, (state) => {
        state.nearbyLoading = false;
        state.nearbyHasError = true;
        state.nearby = [];
      });
  },
});

export const { clearOffer } = offerData.actions;
