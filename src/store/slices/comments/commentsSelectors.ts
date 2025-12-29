import {State} from '../../../types/state.ts';
import {NameSpace} from '../../../const.ts';
import {createSelector} from '@reduxjs/toolkit';
import {ReviewData} from '../../../types/reviews/reviewData.ts';
import {mapCommentToReview} from '../../../utils/mapCommentToReview.ts';

const getComments = (state: Pick<State, NameSpace.Comments>) =>
  state[NameSpace.Comments].comments;

export const getReviewsFiltered = createSelector(
  [getComments],
  (reviews) => {
    if (reviews.length === 0) {
      return [];
    }

    const sortedReviews = [...reviews].map((x) => mapCommentToReview(x)).sort((a: ReviewData, b: ReviewData) =>
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    return sortedReviews.slice(0, 10);
  }
);

export const getTotalComments = (state: Pick<State, NameSpace.Comments>) =>
  state[NameSpace.Comments].comments.length;

export const getCommentsLoadingStatus = (state: Pick<State, NameSpace.Comments>): boolean =>
  state[NameSpace.Comments].isCommentsLoading;

export const getCommentsErrorStatus = (state: Pick<State, NameSpace.Comments>): boolean =>
  state[NameSpace.Comments].hasError;
