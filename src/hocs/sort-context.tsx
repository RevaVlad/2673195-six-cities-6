import {createContext, ReactNode, useCallback, useState} from 'react';
import {SortType} from '../const.ts';

export interface SortContextType {
  currentSortType: SortType;
  setCurrentSortType: (sortType: SortType) => void;
}

export const SortContext = createContext<SortContextType | null>(null);

export function SortProvider({ children }: { children: ReactNode }) {
  const [currentSortType, setCurrentSortType] = useState<SortType>(SortType.Popular);

  const handleSortChange = useCallback((sortType: SortType) => {
    setCurrentSortType(sortType);
  }, []);

  return (
    <SortContext.Provider value={{ currentSortType, setCurrentSortType: handleSortChange }}>
      {children}
    </SortContext.Provider>
  );
}
