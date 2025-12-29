import {CommentList} from '../responses/comments/commentList.ts';

export type CommentsState = {
  comments: CommentList;
  totalComments: number;
  isCommentsLoading: boolean;
  hasError: boolean;
};
