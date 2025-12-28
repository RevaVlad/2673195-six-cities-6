import {useContext} from 'react';
import {SortContext, SortContextType} from '../hocs/SortContext.tsx';

export function useSort(): SortContextType {
  const context = useContext(SortContext);
  if (!context) {
    throw new Error('useSort не может применяться к компоненту без SortProvider\'а.');
  }
  return context;
}
