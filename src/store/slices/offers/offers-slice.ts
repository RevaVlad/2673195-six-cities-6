import {createSlice} from '@reduxjs/toolkit';
import {NameSpace} from '../../../const.ts';
import {OffersState} from '../../../types/stateSlices/offers-state.ts';
import {fetchOffersAction} from '../../apiActions/offers-actions.ts';

const initialState: OffersState = {
  offers: [],
  hasError: false,
  isOffersDataLoading: false,
};

export const offersData = createSlice({
  name: NameSpace.Offers,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchOffersAction.pending, (state) => {
        state.isOffersDataLoading = true;
        state.hasError = false;
      })
      .addCase(fetchOffersAction.fulfilled, (state, action) => {
        state.offers = action.payload;
        state.isOffersDataLoading = false;
        state.hasError = false;
      })
      .addCase(fetchOffersAction.rejected, (state) => {
        state.isOffersDataLoading = false;
        state.hasError = true;
      });
  }
});
