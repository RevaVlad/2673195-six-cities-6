import { memo, useState, useCallback } from 'react';
import {SORT_OPTIONS, SortType} from '../../const.ts';
import { useSort } from '../../hooks/use-sort.ts';

function SortOptions() {
  const {currentSortType, setCurrentSortType} = useSort();
  const [isOpen, setIsOpen] = useState(false);

  const handleSortTypeClick = useCallback((sortType: SortType) => {
    setCurrentSortType(sortType);
    setIsOpen(false);
  }, [setCurrentSortType]);

  const handleToggleClick = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  return (
    <form className="places__sorting" action="#" method="get" onClick={(e) => e.preventDefault()}>
      <span className="places__sorting-caption">Sort by </span>
      <span
        className="places__sorting-type"
        tabIndex={0}
        onClick={handleToggleClick}
        data-testid="sort-toggle" // Добавлено
      >
        {currentSortType}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={`places__options places__options--custom ${isOpen ? 'places__options--opened' : ''}`}>
        {SORT_OPTIONS.map((option) => (
          <li
            key={option}
            className={`places__option ${currentSortType === option ? 'places__option--active' : ''}`}
            onClick={() => handleSortTypeClick(option)}
          >
            {option.toString()}
          </li>
        ))}
      </ul>
    </form>
  );
}

export const SortOptionsMemo = memo(SortOptions);
