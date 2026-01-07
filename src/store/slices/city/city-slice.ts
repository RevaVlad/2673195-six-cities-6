import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CityName } from '../../../types/city-name.ts';
import { CITIES } from '../../../const.ts';
import { NameSpace } from '../../../const.ts';
import {CityState} from '../../../types/stateSlices/city-state.ts';

const initialState: CityState = {
  cityName: CITIES.Paris
};

export const citySlice = createSlice({
  name: NameSpace.City,
  initialState,
  reducers: {
    setCity: (state, action: PayloadAction<CityName>) => {
      state.cityName = action.payload;
    }
  }
});

export const { setCity } = citySlice.actions;
