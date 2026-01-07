import { vi, describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Tab } from './tab.tsx';
import {CITIES} from '../../const.ts';

describe('Tab Component', () => {
  const mockHandleClick = vi.fn();

  const defaultProps = {
    city: CITIES.Paris,
    isActive: false,
    handleClick: mockHandleClick,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('rendering', () => {
    it('should render city name correctly', () => {
      render(<Tab {...defaultProps} />);

      expect(screen.getByText('Paris')).toBeInTheDocument();
    });

    it('should render span with city name inside link', () => {
      render(<Tab {...defaultProps} />);

      const link = screen.getByRole('link');
      const span = screen.getByText('Paris');

      expect(link).toContainElement(span);
      expect(span.tagName).toBe('SPAN');
    });
  });

  describe('active state', () => {
    it('should have active class when isActive is true', () => {
      const props = {
        ...defaultProps,
        isActive: true,
      };

      render(<Tab {...props} />);

      const link = screen.getByRole('link');
      expect(link).toHaveClass('tabs__item--active');
    });

    it('should NOT have active class when isActive is false', () => {
      render(<Tab {...defaultProps} />);

      const link = screen.getByRole('link');
      expect(link).not.toHaveClass('tabs__item--active');
    });

    it('should render with correct classes for inactive tab', () => {
      render(<Tab {...defaultProps} />);

      const link = screen.getByRole('link');
      expect(link.className).toBe('locations__item-link tabs__item');
    });

    it('should render with correct classes for active tab', () => {
      const props = {
        ...defaultProps,
        isActive: true,
      };

      render(<Tab {...props} />);

      const link = screen.getByRole('link');
      expect(link.className).toBe('locations__item-link tabs__item tabs__item--active');
    });
  });

  describe('with different cities', () => {
    const testCases = [
      { city: CITIES.Paris, expectedText: 'Paris' },
      { city: CITIES.Cologne, expectedText: 'Cologne' },
      { city: CITIES.Brussels, expectedText: 'Brussels' },
      { city: CITIES.Amsterdam, expectedText: 'Amsterdam' },
      { city: CITIES.Hamburg, expectedText: 'Hamburg' },
      { city: CITIES.Dusseldorf, expectedText: 'Dusseldorf' },
    ];

    testCases.forEach(({ city, expectedText }) => {
      it(`should render city name "${city}" correctly`, () => {
        render(<Tab {...defaultProps} city={city} />);

        expect(screen.getByText(expectedText)).toBeInTheDocument();
      });
    });
  });
});
