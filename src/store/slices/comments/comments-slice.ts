import {CommentsState} from '../../../types/stateSlices/comments-state.ts';
import {NameSpace} from '../../../const.ts';
import {createSlice} from '@reduxjs/toolkit';
import {fetchCommentsAction, postCommentAction} from '../../apiActions/comments-actions.ts';

const initialState: CommentsState = {
  comments: [],
  totalComments: 0,
  isCommentsLoading: false,
  hasError: false,
};

export const commentsSlice = createSlice({
  name: NameSpace.Comments,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCommentsAction.pending, (state) => {
        state.isCommentsLoading = true;
        state.hasError = false;
      })
      .addCase(fetchCommentsAction.fulfilled, (state, action) => {
        state.comments = action.payload;
        state.totalComments = action.payload.length;
        state.isCommentsLoading = false;
        state.hasError = false;
      })
      .addCase(fetchCommentsAction.rejected, (state) => {
        state.isCommentsLoading = false;
        state.hasError = true;
      })
      .addCase(postCommentAction.pending, (state) => {
        state.isCommentsLoading = true;
      })
      .addCase(postCommentAction.fulfilled, (state, action) => {
        state.isCommentsLoading = false;
        state.comments.push(action.payload);
      })
      .addCase(postCommentAction.rejected, (state) => {
        state.isCommentsLoading = false;
      });
  }
});
