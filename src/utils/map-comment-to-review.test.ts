import { mapCommentToReview } from './map-comment-to-review.ts';
import { CommentDto } from '../types/responses/comments/comments-dto.ts';

describe('mapCommentToReview', () => {
  it('maps CommentDto to ReviewData correctly', () => {
    const mockCommentDto: CommentDto = {
      id: 1,
      date: '2024-01-15T10:30:00Z',
      user: {
        name: 'John Doe',
        avatarUrl: 'avatar.jpg',
        isPro: true,
      },
      comment: 'Great place!',
      rating: 4,
    };

    const result = mapCommentToReview(mockCommentDto);

    expect(result).toEqual({
      id: 1,
      date: new Date('2024-01-15T10:30:00Z'),
      user: {
        name: 'John Doe',
        avatarUrl: 'avatar.jpg',
        isPro: true,
      },
      comment: 'Great place!',
      rating: 4,
    });
  });
});
