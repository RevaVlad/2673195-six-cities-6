import {combineReducers} from '@reduxjs/toolkit';
import {NameSpace} from '../const.ts';
import {userData} from './slices/user/user-slice.ts';
import {offersData} from './slices/offers/offers-slice.ts';
import {favouritesData} from './slices/favourites/favourites-slice.ts';
import {citySlice} from './slices/city/city-slice.ts';
import {commentsSlice} from './slices/comments/comments-slice.ts';
import {offerData} from './slices/offer/offer-slice.ts';

export const rootReducer = combineReducers({
  [NameSpace.City]: citySlice.reducer,
  [NameSpace.User]: userData.reducer,
  [NameSpace.Offer]: offerData.reducer,
  [NameSpace.Offers]: offersData.reducer,
  [NameSpace.Favourites]: favouritesData.reducer,
  [NameSpace.Comments]: commentsSlice.reducer,
});
