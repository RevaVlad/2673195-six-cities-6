import {createSlice} from '@reduxjs/toolkit';
import {NameSpace} from '../../../const.ts';
import {fetchFavouriteAction} from '../../apiActions/favourite-actions.ts';
import {FavouritesState} from '../../../types/stateSlices/favourites-state.ts';


const initialState: FavouritesState = {
  favourites: [],
  hasError: true,
  isFavouritesDataLoading: false,
};

export const favouritesData = createSlice({
  name: NameSpace.Favourites,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchFavouriteAction.pending, (state) => {
        state.isFavouritesDataLoading = true;
        state.hasError = false;
      })
      .addCase(fetchFavouriteAction.fulfilled, (state, action) => {
        state.favourites = action.payload;
        state.hasError = false;
      })
      .addCase(fetchFavouriteAction.rejected, (state) => {
        state.isFavouritesDataLoading = false;
        state.hasError = true;
      });
  }
});
