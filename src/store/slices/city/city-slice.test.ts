import { citySlice, setCity } from './city-slice.ts';
import { CITIES } from '../../../const.ts';

describe('City Slice', () => {
  const initialState = { cityName: CITIES.Paris };

  describe('initial state', () => {
    it('should return initial state', () => {
      const result = citySlice.reducer(undefined, { type: '' });
      expect(result).toEqual(initialState);
    });
  });

  describe('setCity action', () => {
    it('should handle setCity action', () => {
      const action = setCity(CITIES.Amsterdam);
      const result = citySlice.reducer(initialState, action);

      expect(result.cityName).toBe(CITIES.Amsterdam);
    });

    it('should handle multiple city changes', () => {
      let result = citySlice.reducer(undefined, { type: '' });

      result = citySlice.reducer(result, setCity(CITIES.Cologne));
      expect(result.cityName).toBe(CITIES.Cologne);

      result = citySlice.reducer(result, setCity(CITIES.Hamburg));
      expect(result.cityName).toBe(CITIES.Hamburg);
    });
  });
});
