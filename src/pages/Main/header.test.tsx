import { render, screen } from '@testing-library/react';
import { Header } from './header.tsx';
import {CITIES} from '../../const.ts';
import {SortProvider} from '../../hocs/sort-context.tsx';

describe('Header Component', () => {
  const defaultProps = {
    activeCity: CITIES.Paris,
    offersInCityCount: 5,
  };

  it('should render correctly with given props', () => {
    render(<SortProvider><Header {...defaultProps} /></SortProvider>);

    expect(screen.getByText('5 places to stay in Paris')).toBeInTheDocument();
    expect(screen.getByText('Places')).toBeInTheDocument();
    expect(screen.getByText('Places')).toHaveClass('visually-hidden');
  });

  it('should render different city and count', () => {
    const props = {
      activeCity: CITIES.Amsterdam,
      offersInCityCount: 12,
    };

    render(<SortProvider><Header {...props} /></SortProvider>);

    expect(screen.getByText('12 places to stay in Amsterdam')).toBeInTheDocument();
  });
});
