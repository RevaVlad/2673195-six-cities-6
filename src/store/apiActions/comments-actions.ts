import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, State} from '../../types/state.ts';
import {AxiosInstance} from 'axios';
import {APIRoute} from '../../const.ts';
import {PostCommentRequest} from '../../types/requests/post-comment-request.ts';
import {CommentList} from '../../types/responses/comments/comment-list.ts';
import {CommentDto} from '../../types/responses/comments/comments-dto.ts';

export const fetchCommentsAction = createAsyncThunk<CommentList, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchComments',
  async (offerId, {extra: api}) => {
    const {data} = await api.get<CommentList>(APIRoute.Comments(offerId));
    return data;
  },
);

export const postCommentAction = createAsyncThunk<CommentDto, PostCommentRequest, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/postComment',
  async ({ offerId, comment } : PostCommentRequest, {extra: api}) => {
    const {data} = await api.post<CommentDto>(APIRoute.Comments(offerId), comment);
    return data;
  },
);
