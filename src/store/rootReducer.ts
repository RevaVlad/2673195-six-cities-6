import {combineReducers} from '@reduxjs/toolkit';
import {NameSpace} from '../const.ts';
import {userData} from './slices/user/userSlice.ts';
import {offersData} from './slices/offers/offersSlice.ts';
import {favouritesData} from './slices/favourites/favouritesScice.ts';
import {citySlice} from './slices/city/citySlice.ts';
import {commentsSlice} from './slices/comments/commentsSlice.ts';
import {offerData} from './slices/offer/offerSlice.ts';

export const rootReducer = combineReducers({
  [NameSpace.City]: citySlice.reducer,
  [NameSpace.User]: userData.reducer,
  [NameSpace.Offer]: offerData.reducer,
  [NameSpace.Offers]: offersData.reducer,
  [NameSpace.Favourites]: favouritesData.reducer,
  [NameSpace.Comments]: commentsSlice.reducer,
});
