import { renderHook } from '@testing-library/react';
import { useSort } from './useSort';
import { SortProvider } from '../hocs/SortContext';
import { SortType } from '../const';
import React from 'react';
import {act} from 'react-dom/test-utils';

describe('Hook: useSort', () => {
  it('should return current sort and setSort function when called inside SortProvider', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <SortProvider>{children}</SortProvider>
    );

    const { result } = renderHook(() => useSort(), { wrapper });

    expect(result.current.currentSortType).toBe(SortType.Popular);
    expect(typeof result.current.setCurrentSortType).toBe('function');
  });

  it('should update sort when setCurrentSortType is called', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <SortProvider>{children}</SortProvider>
    );

    const { result } = renderHook(() => useSort(), { wrapper });

    expect(result.current.currentSortType).toBe(SortType.Popular);

    act(() => {
      result.current.setCurrentSortType(SortType.PriceHighToLow);
    });

    expect(result.current.currentSortType).toBe(SortType.PriceHighToLow);
  });

  it('should throw Error when used outside SortProvider', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    expect(() => {
      renderHook(() => useSort());
    }).toThrow('useSort не может применяться к компоненту без SortProvider\'а.');

    consoleSpy.mockRestore();
  });
});
