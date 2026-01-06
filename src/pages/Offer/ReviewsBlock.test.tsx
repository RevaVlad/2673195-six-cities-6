import { render, screen } from '@testing-library/react';
import { ReviewsBlock } from './ReviewsBlock';
import { vi } from 'vitest';
import { ReviewListData } from '../../types/reviews/reviewListData.ts';
import { ReviewData } from '../../types/reviews/reviewData.ts';

const mockUseAppSelector = vi.hoisted(() => vi.fn());
const mockUseAppDispatch = vi.hoisted(() => vi.fn());
const mockFetchCommentsAction = vi.hoisted(() => vi.fn());

const MockReviewsList = vi.hoisted(() =>
  vi.fn(({ reviews }: { reviews: ReviewListData }) => (
    <div data-testid="reviews-list">Reviews: {reviews.length}</div>
  ))
);

const MockReviewForm = vi.hoisted(() =>
  vi.fn(({ offerId }: { offerId: string }) => (
    <div data-testid="review-form">Form for offer: {offerId}</div>
  ))
);

const MockSpinner = vi.hoisted(() =>
  vi.fn(() => <div data-testid="spinner">Loading...</div>)
);

vi.mock('../../hooks/useAppSelector', () => ({
  useAppSelector: mockUseAppSelector,
}));

vi.mock('../../hooks/useAppDispatch', () => ({
  useAppDispatch: () => mockUseAppDispatch,
}));

vi.mock('../../store/apiActions/commentsActions.ts', () => ({
  fetchCommentsAction: mockFetchCommentsAction,
}));

vi.mock('./ReviewsList.tsx', () => ({
  ReviewsList: MockReviewsList,
}));

vi.mock('./ReviewForm.tsx', () => ({
  ReviewForm: MockReviewForm,
}));

vi.mock('../../components/Spinner.tsx', () => ({
  Spinner: MockSpinner,
}));

describe('Component: ReviewsBlock', () => {
  const mockOfferId = '123';

  const createMockReview = (id: number): ReviewData => ({
    id,
    date: new Date('2024-01-01'),
    user: {
      name: 'User Name',
      avatarUrl: 'avatar.jpg',
      isPro: false,
    },
    comment: `Comment ${id}`,
    rating: 4,
  });

  const mockEmptyComments: ReviewListData = [];
  const mockComments: ReviewListData = [
    createMockReview(1),
    createMockReview(2),
  ];
  const mockSingleComment: ReviewListData = [createMockReview(1)];

  beforeEach(() => {
    vi.clearAllMocks();
    mockUseAppDispatch.mockReturnValue(vi.fn());
    mockFetchCommentsAction.mockReturnValue({
      type: 'FETCH_COMMENTS',
      payload: mockOfferId
    });
  });

  it('shows spinner when loading', () => {
    mockUseAppSelector.mockReturnValueOnce(true)
      .mockReturnValueOnce(false)
      .mockReturnValueOnce(mockEmptyComments)
      .mockReturnValueOnce(0);

    render(<ReviewsBlock offerId={mockOfferId} />);

    expect(screen.getByTestId('spinner')).toBeInTheDocument();
    expect(screen.queryByTestId('reviews-list')).not.toBeInTheDocument();
    expect(screen.queryByTestId('review-form')).not.toBeInTheDocument();
  });

  it('renders title with total comments when not loading', () => {
    mockUseAppSelector.mockReturnValueOnce(false)
      .mockReturnValueOnce(false)
      .mockReturnValueOnce(mockEmptyComments)
      .mockReturnValueOnce(5);

    render(<ReviewsBlock offerId={mockOfferId} />);

    expect(screen.getByText('Reviews ·')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('renders review form when not loading', () => {
    mockUseAppSelector.mockReturnValueOnce(false)
      .mockReturnValueOnce(false)
      .mockReturnValueOnce(mockEmptyComments)
      .mockReturnValueOnce(0);

    render(<ReviewsBlock offerId={mockOfferId} />);

    expect(screen.getByTestId('review-form')).toBeInTheDocument();
    expect(screen.getByTestId('review-form')).toHaveTextContent(`Form for offer: ${mockOfferId}`);
  });

  it('does NOT render reviews list when there is an error', () => {
    mockUseAppSelector.mockReturnValueOnce(false)
      .mockReturnValueOnce(true)
      .mockReturnValueOnce(mockComments)
      .mockReturnValueOnce(2);

    render(<ReviewsBlock offerId={mockOfferId} />);

    expect(screen.queryByTestId('reviews-list')).not.toBeInTheDocument();
    expect(screen.getByTestId('review-form')).toBeInTheDocument();
  });

  it('renders reviews list when there is NO error', () => {
    mockUseAppSelector.mockReturnValueOnce(false)
      .mockReturnValueOnce(false)
      .mockReturnValueOnce(mockSingleComment)
      .mockReturnValueOnce(1);

    render(<ReviewsBlock offerId={mockOfferId} />);

    expect(screen.getByTestId('reviews-list')).toHaveTextContent('Reviews: 1');
    expect(screen.getByTestId('review-form')).toBeInTheDocument();
  });

  it('dispatches fetchCommentsAction on mount', () => {
    mockUseAppSelector.mockReturnValueOnce(false)
      .mockReturnValueOnce(false)
      .mockReturnValueOnce(mockEmptyComments)
      .mockReturnValueOnce(0);

    const mockDispatch = vi.fn();
    mockUseAppDispatch.mockReturnValue(mockDispatch);

    render(<ReviewsBlock offerId={mockOfferId} />);

    expect(mockUseAppDispatch).toHaveBeenCalledWith({
      type: 'FETCH_COMMENTS',
      payload: mockOfferId
    });
  });

  it('dispatches fetchCommentsAction when offerId changes', () => {
    const mockDispatch = vi.fn();
    mockUseAppDispatch.mockReturnValue(mockDispatch);

    mockUseAppSelector.mockReturnValueOnce(false)
      .mockReturnValueOnce(false)
      .mockReturnValueOnce(mockEmptyComments)
      .mockReturnValueOnce(0);

    const { rerender } = render(<ReviewsBlock offerId="123" />);

    vi.clearAllMocks();

    mockUseAppDispatch.mockReturnValue(mockDispatch);
    mockFetchCommentsAction.mockReturnValue({
      type: 'FETCH_COMMENTS',
      payload: '456'
    });

    mockUseAppSelector.mockReturnValueOnce(false)
      .mockReturnValueOnce(false)
      .mockReturnValueOnce(mockEmptyComments)
      .mockReturnValueOnce(0);

    rerender(<ReviewsBlock offerId="456" />);

    expect(mockUseAppDispatch).toHaveBeenCalledWith({
      type: 'FETCH_COMMENTS',
      payload: '456'
    });
  });
});
