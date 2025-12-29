import { commentsSlice } from './commentsSlice.ts';
import { fetchCommentsAction, postCommentAction } from '../../apiActions/commentsActions';
import { ReviewData } from '../../../types/reviews/reviewData';
import { getCommentsFiltered } from './commentsSelectors';
import {NameSpace} from '../../../const.ts';

const createMockReviewData = (overrides?: Partial<ReviewData>): ReviewData => ({
  id: 1,
  date: new Date('2024-01-15T10:30:00Z'),
  user: {
    name: 'John Doe',
    avatarUrl: 'avatar.jpg',
    isPro: true,
  },
  comment: 'Great place!',
  rating: 4,
  ...overrides
});

describe('Comments Slice', () => {

  const mockComments = Array.from({ length: 11 }, (_, index) =>
    createMockReviewData({
      id: index + 1,
      date: new Date(`2024-01-${String(index + 10).padStart(2, '0')}T10:30:00Z`),
      comment: `Comment ${index + 1}`
    })
  );

  describe('initial state', () => {
    it('returns initial state', () => {
      const result = commentsSlice.reducer(undefined, { type: '' });

      expect(result).toEqual({
        comments: [],
        totalComments: 0,
        isCommentsLoading: false,
        hasError: false,
      });
    });
  });

  describe('extraReducers', () => {
    describe('fetchCommentsAction', () => {
      it('handles fetchCommentsAction.pending', () => {
        const initialState = {
          comments: [],
          totalComments: 0,
          isCommentsLoading: false,
          hasError: true,
        };

        const action = { type: fetchCommentsAction.pending.type };
        const result = commentsSlice.reducer(initialState, action);

        expect(result.isCommentsLoading).toBe(true);
        expect(result.hasError).toBe(false);
      });

      it('handles fetchCommentsAction.fulfilled', () => {
        const loadingState = {
          comments: [],
          totalComments: 0,
          isCommentsLoading: true,
          hasError: false,
        };

        const action = {
          type: fetchCommentsAction.fulfilled.type,
          payload: mockComments.slice(0, 5)
        };
        const result = commentsSlice.reducer(loadingState, action);

        expect(result.comments).toEqual(mockComments.slice(0, 5));
        expect(result.totalComments).toBe(5);
        expect(result.isCommentsLoading).toBe(false);
        expect(result.hasError).toBe(false);
      });

      it('handles fetchCommentsAction.rejected', () => {
        const loadingState = {
          comments: [],
          totalComments: 0,
          isCommentsLoading: true,
          hasError: false,
        };

        const action = { type: fetchCommentsAction.rejected.type };
        const result = commentsSlice.reducer(loadingState, action);

        expect(result.isCommentsLoading).toBe(false);
        expect(result.hasError).toBe(true);
      });
    });

    describe('postCommentAction', () => {
      it('handles postCommentAction.pending', () => {
        const initialState = {
          comments: mockComments.slice(0, 3),
          totalComments: 3,
          isCommentsLoading: false,
          hasError: false,
        };

        const action = { type: postCommentAction.pending.type };
        const result = commentsSlice.reducer(initialState, action);

        expect(result.isCommentsLoading).toBe(true);
      });

      it('handles postCommentAction.fulfilled', () => {
        const loadingState = {
          comments: mockComments.slice(0, 3),
          totalComments: 3,
          isCommentsLoading: true,
          hasError: false,
        };

        const newComment = createMockReviewData({
          id: 12,
          date: new Date('2024-02-01T10:30:00Z'),
          comment: 'New comment'
        });

        const action = {
          type: postCommentAction.fulfilled.type,
          payload: newComment
        };
        const result = commentsSlice.reducer(loadingState, action);

        expect(result.comments).toHaveLength(4);
        expect(result.comments[3]).toEqual(newComment);
        expect(result.isCommentsLoading).toBe(false);
      });

      it('handles postCommentAction.rejected', () => {
        const loadingState = {
          comments: mockComments.slice(0, 3),
          totalComments: 3,
          isCommentsLoading: true,
          hasError: false,
        };

        const action = { type: postCommentAction.rejected.type };
        const result = commentsSlice.reducer(loadingState, action);

        expect(result.isCommentsLoading).toBe(false);
      });
    });
  });

  describe('selectors', () => {
    const createMockState = (comments: ReviewData[]) => ({
      [NameSpace.Comments]: {
        comments,
        totalComments: comments.length,
        isCommentsLoading: false,
        hasError: false,
      }
    });

    it('returns empty array for no comments', () => {
      const state = createMockState([]);
      const result = getCommentsFiltered(state);
      expect(result).toEqual([]);
    });

    it('returns sorted comments by date descending', () => {
      const unsortedComments = [
        createMockReviewData({ id: 1, date: new Date('2024-01-10T10:30:00Z') }),
        createMockReviewData({ id: 2, date: new Date('2024-01-20T10:30:00Z') }),
        createMockReviewData({ id: 3, date: new Date('2024-01-15T10:30:00Z') }),
      ];

      const state = createMockState(unsortedComments);
      const result = getCommentsFiltered(state);

      expect(result).toHaveLength(3);
      expect(result[0].id).toBe(2);
      expect(result[1].id).toBe(3);
      expect(result[2].id).toBe(1);
    });

    it('returns only first 10 comments when more than 10', () => {
      const allComments = Array.from({ length: 15 }, (_, index) =>
        createMockReviewData({
          id: index + 1,
          date: new Date(`2024-01-${String(index + 10).padStart(2, '0')}T10:30:00Z`)
        })
      );

      const state = createMockState(allComments);
      const result = getCommentsFiltered(state);

      expect(result).toHaveLength(10);
      expect(result[0].id).toBe(15);
      expect(result[9].id).toBe(6);
    });
  });
});

