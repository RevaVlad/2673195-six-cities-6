import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Review } from './review.tsx';
import {ReviewData} from '../../types/reviews/review-data.ts';

describe('Review Component', () => {
  const mockReview: ReviewData = {
    id: 1,
    comment: 'Apartment',
    rating: 4,
    date: new Date('2024-03-15'),
    user: {
      name: 'John Doe',
      avatarUrl: '/avatar.jpg',
      isPro: false,
    }
  };

  it('should render user information', () => {
    render(<Review review={mockReview} />);

    expect(screen.getByText('John Doe')).toBeInTheDocument();

    const avatar = screen.getByAltText('Reviews avatar');
    expect(avatar).toBeInTheDocument();
    expect(avatar).toHaveAttribute('src', '/avatar.jpg');
    expect(avatar).toHaveAttribute('width', '54');
    expect(avatar).toHaveAttribute('height', '54');
  });

  it('should render comment text', () => {
    render(<Review review={mockReview} />);

    expect(screen.getByText('Apartment')).toBeInTheDocument();
  });

  it('should render date in correct format', () => {
    render(<Review review={mockReview} />);

    const timeElement = screen.getByText('March 2024');
    expect(timeElement).toBeInTheDocument();
    expect(timeElement).toHaveAttribute('datetime', '2024-03-15');
  });

  it('should have correct CSS classes', () => {
    const { container } = render(<Review review={mockReview} />);

    expect(container.firstChild).toHaveClass('reviews__item');
    expect(screen.getByText('John Doe')).toHaveClass('reviews__user-name');
    expect(screen.getByText('Apartment')).toHaveClass('reviews__text');
  });
});
