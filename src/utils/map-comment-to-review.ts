import {CommentDto} from '../types/responses/comments/comments-dto.ts';
import {ReviewData} from '../types/reviews/review-data.ts';

export const mapCommentToReview = (dto: CommentDto): ReviewData => ({
  ...dto,
  date: new Date(dto.date)
});
