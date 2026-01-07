import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import type { CityName } from '../../types/city-name.ts';
import { CITIES_LIST } from '../../const.ts';
import { Tabs } from './tabs.tsx';

const mockDispatch = vi.fn();

vi.mock('../../hooks/use-app-dispatch', () => ({
  useAppDispatch: () => mockDispatch,
}));

vi.mock('../../store/slices/city/city-slice', () => ({
  setCity: (city: CityName) => ({ type: 'SET_CITY', payload: city }),
}));

describe('Component: Tabs', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const activeCity: CityName = 'Paris';

  it('renders all cities from CITIES_LIST', () => {
    render(<Tabs activeCity={activeCity} />);

    CITIES_LIST.forEach((city) => {
      expect(screen.getByText(city)).toBeInTheDocument();
    });
  });

  it('dispatches setCity action when city tab is clicked', async () => {
    const user = userEvent.setup();
    render(<Tabs activeCity={activeCity} />);

    const amsterdamTab = screen.getByText('Amsterdam');
    await user.click(amsterdamTab);

    expect(mockDispatch).toHaveBeenCalledWith({ type: 'SET_CITY', payload: 'Amsterdam' });
  });
});
