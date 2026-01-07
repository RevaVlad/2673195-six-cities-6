import {CommentList} from '../responses/comments/comment-list.ts';

export type CommentsState = {
  comments: CommentList;
  totalComments: number;
  isCommentsLoading: boolean;
  hasError: boolean;
};
