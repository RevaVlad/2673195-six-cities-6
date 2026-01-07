import { render, screen } from '@testing-library/react';
import { vi, describe, it, expect } from 'vitest';
import { ReviewsList } from './reviews-list.tsx';
import {ReviewListData} from '../../types/reviews/review-list-data.ts';

vi.mock('./review.tsx', () => ({
  Review: vi.fn(() => <li data-testid="review-item">Review</li>)
}));

describe('ReviewsList Component', () => {
  const mockReviews: ReviewListData = [
    {
      id: 1,
      comment: 'Great place!',
      rating: 5,
      date: new Date('2024-01-01'),
      user: {
        name: 'John',
        avatarUrl: '/avatar1.jpg',
        isPro: true
      }
    },
    {
      id: 2,
      comment: 'Nice stay',
      rating: 4,
      date: new Date('2024-02-01'),
      user: {
        name: 'Jane',
        avatarUrl: '/avatar2.jpg',
        isPro: false
      }
    }
  ];

  it('should render list with correct class', () => {
    render(<ReviewsList reviews={mockReviews} />);

    const list = screen.getByRole('list');
    expect(list).toBeInTheDocument();
    expect(list).toHaveClass('reviews__list');
  });

  it('should render correct number of review items', () => {
    render(<ReviewsList reviews={mockReviews} />);

    const reviewItems = screen.getAllByTestId('review-item');
    expect(reviewItems).toHaveLength(mockReviews.length);
  });

  it('should render empty list when no reviews', () => {
    render(<ReviewsList reviews={[]} />);

    const list = screen.getByRole('list');
    expect(list).toBeInTheDocument();
    expect(list).toBeEmptyDOMElement();
  });
});
