import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { ReviewFormRating } from './review-form-rating.tsx';

describe('Component: ReviewFormRating', () => {
  const mockHandleRatingChange = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders all 5 star rating options', () => {
    render(<ReviewFormRating handleRatingChange={mockHandleRatingChange} />);

    expect(screen.getByTitle('perfect')).toBeInTheDocument();
    expect(screen.getByTitle('good')).toBeInTheDocument();
    expect(screen.getByTitle('not bad')).toBeInTheDocument();
    expect(screen.getByTitle('badly')).toBeInTheDocument();
    expect(screen.getByTitle('terribly')).toBeInTheDocument();
  });

  it('has correct values for each star input', () => {
    render(<ReviewFormRating handleRatingChange={mockHandleRatingChange} />);

    const stars = screen.getAllByRole('radio');

    expect(stars[0]).toHaveAttribute('value', '5');
    expect(stars[1]).toHaveAttribute('value', '4');
    expect(stars[2]).toHaveAttribute('value', '3');
    expect(stars[3]).toHaveAttribute('value', '2');
    expect(stars[4]).toHaveAttribute('value', '1');
  });

  it('has correct ids for each star input', () => {
    render(<ReviewFormRating handleRatingChange={mockHandleRatingChange} />);

    const stars = screen.getAllByRole('radio');

    expect(stars[0]).toHaveAttribute('id', '5-stars');
    expect(stars[1]).toHaveAttribute('id', '4-stars');
    expect(stars[2]).toHaveAttribute('id', '3-stars');
    expect(stars[3]).toHaveAttribute('id', '2-stars');
    expect(stars[4]).toHaveAttribute('id', '1-star');
  });

  it('has radio input type for all stars', () => {
    render(<ReviewFormRating handleRatingChange={mockHandleRatingChange} />);

    const stars = screen.getAllByRole('radio');
    expect(stars).toHaveLength(5);

    stars.forEach((star) => {
      expect(star).toHaveAttribute('type', 'radio');
    });
  });

  it('has visually-hidden class on inputs', () => {
    render(<ReviewFormRating handleRatingChange={mockHandleRatingChange} />);

    const stars = screen.getAllByRole('radio');

    stars.forEach((star) => {
      expect(star).toHaveClass('form__rating-input');
      expect(star).toHaveClass('visually-hidden');
    });
  });

  it('has star icons in labels', () => {
    render(<ReviewFormRating handleRatingChange={mockHandleRatingChange} />);

    const labels = screen.getAllByTitle(/perfect|good|not bad|badly|terribly/);
    expect(labels).toHaveLength(5);

    labels.forEach((label) => {
      const svg = label.querySelector('svg');
      expect(svg).toBeInTheDocument();
      expect(svg).toHaveClass('form__star-image');
    });
  });

  it('calls handleRatingChange when star is selected', async () => {
    const user = userEvent.setup();
    render(<ReviewFormRating handleRatingChange={mockHandleRatingChange} />);

    const stars = screen.getAllByRole('radio');
    const perfectStar = stars[0];
    await user.click(perfectStar);

    expect(mockHandleRatingChange).toHaveBeenCalledTimes(1);
  });

  it('has labels with correct for attributes', () => {
    render(<ReviewFormRating handleRatingChange={mockHandleRatingChange} />);

    const labels = screen.getAllByTitle(/perfect|good|not bad|badly|terribly/);

    expect(labels[0]).toHaveAttribute('for', '5-stars');
    expect(labels[1]).toHaveAttribute('for', '4-stars');
    expect(labels[2]).toHaveAttribute('for', '3-stars');
    expect(labels[3]).toHaveAttribute('for', '2-stars');
    expect(labels[4]).toHaveAttribute('for', '1-star');
  });
});
