import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ReviewForm } from './review-form.tsx';
import { vi } from 'vitest';
import {ChangeEvent} from 'react';

const mockUseAppDispatch = vi.hoisted(() => vi.fn());
const mockPostCommentAction = vi.hoisted(() => vi.fn());

const MockReviewFormRating = vi.hoisted(() =>
  vi.fn(({ handleRatingChange }: {
    handleRatingChange: (e: ChangeEvent<HTMLInputElement>) => void;
  }) => {
    const handleClick = () => {
      const input = document.createElement('input');
      input.value = '5';

      const event = new Event('change', { bubbles: true }) as unknown as ChangeEvent<HTMLInputElement>;
      Object.defineProperty(event, 'target', {
        value: input,
        writable: true,
      });

      Object.defineProperty(event, 'currentTarget', {
        value: input,
        writable: true,
      });

      handleRatingChange(event);
    };

    return (
      <div
        data-testid="review-form-rating"
        onClick={handleClick}
      >
        Rating Component
      </div>
    );
  })
);

vi.mock('../../hooks/use-app-dispatch', () => ({
  useAppDispatch: () => mockUseAppDispatch ,
}));

vi.mock('../../store/apiActions/comments-actions.ts', () => ({
  postCommentAction: mockPostCommentAction ,
}));

vi.mock('./review-form-rating.tsx', () => ({
  ReviewFormRating: MockReviewFormRating,
}));

describe('Component: ReviewForm', () => {
  const mockOfferId = '123';

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders form elements', () => {
    render(<ReviewForm offerId={mockOfferId} />);

    expect(screen.getByText('Your review')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Tell how was your stay, what you like and what can be improved')).toBeInTheDocument();
    expect(screen.getByText('Submit')).toBeInTheDocument();
  });

  it('has submit button disabled initially', () => {
    render(<ReviewForm offerId={mockOfferId} />);

    const submitButton = screen.getByRole('button', { name: 'Submit' });
    expect(submitButton).toBeDisabled();
  });

  it('enables submit button with valid rating and comment', async () => {
    const user = userEvent.setup();
    render(<ReviewForm offerId={mockOfferId} />);

    const textarea = screen.getByPlaceholderText('Tell how was your stay, what you like and what can be improved');
    const ratingComponent = screen.getByTestId('review-form-rating');
    const submitButton = screen.getByRole('button', { name: 'Submit' });

    await user.type(textarea, 'This is an excellent stay with great amenities and friendly staff. I would definitely recommend it to others.');
    await user.click(ratingComponent);

    expect(submitButton).toBeEnabled();
  });

  it('keeps submit button disabled with short comment', async () => {
    const user = userEvent.setup();
    render(<ReviewForm offerId={mockOfferId} />);

    const textarea = screen.getByPlaceholderText('Tell how was your stay, what you like and what can be improved');
    const ratingComponent = screen.getByTestId('review-form-rating');
    const submitButton = screen.getByRole('button', { name: 'Submit' });

    await user.type(textarea, 'Short comment');
    await user.click(ratingComponent);

    expect(submitButton).toBeDisabled();
  });

  it('keeps submit button disabled without rating', async () => {
    const user = userEvent.setup();
    render(<ReviewForm offerId={mockOfferId} />);

    const textarea = screen.getByPlaceholderText('Tell how was your stay, what you like and what can be improved');
    const submitButton = screen.getByRole('button', { name: 'Submit' });

    await user.type(textarea, 'This is an excellent stay with great amenities and friendly staff. I would definitely recommend it to others.');

    expect(submitButton).toBeDisabled();
  });

  it('updates textarea value on input', async () => {
    const user = userEvent.setup();
    render(<ReviewForm offerId={mockOfferId} />);

    const textarea = screen.getByRole('textbox');
    const testText = 'Great experience!';

    await user.type(textarea, testText);

    expect(textarea).toHaveValue(testText);
  });

  it('has textarea with min and max length attributes', () => {
    render(<ReviewForm offerId={mockOfferId} />);

    const textarea = screen.getByPlaceholderText('Tell how was your stay, what you like and what can be improved');

    expect(textarea).toHaveAttribute('minLength', '50');
    expect(textarea).toHaveAttribute('maxLength', '300');
  });
});
