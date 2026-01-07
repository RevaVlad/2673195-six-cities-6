import React, {useState} from 'react';
import {postCommentAction} from '../../store/apiActions/comments-actions.ts';
import {useAppDispatch} from '../../hooks/use-app-dispatch.ts';
import {ReviewFormRating} from './review-form-rating.tsx';
import type {NewCommentDto} from '../../types/requests/post-comment-request.ts';

export function ReviewForm({offerId} : { offerId: string }) {
  const [formData, setFormData] = useState<NewCommentDto>({
    rating: 0,
    comment: '',
  });

  const dispatch = useAppDispatch();

  const postComment = () => {
    dispatch(postCommentAction({offerId: offerId, comment: formData}));
  };

  const handleRatingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      rating: Number(e.target.value),
    });
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      comment: e.target.value,
    });
  };

  const isFormValid =
    formData.rating > 0
    && formData.rating <= 5
    && formData.comment.length >= 50
    && formData.comment.length <= 300;

  return (
    <form className="reviews__form form" action="#" method="post">
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <ReviewFormRating handleRatingChange={handleRatingChange} />
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="reviewText"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={formData.comment}
        onChange={handleTextChange}
        minLength={50}
        maxLength={300}
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and
          describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          onClick={postComment}
          disabled={!isFormValid}
        >
          Submit
        </button>
      </div>
    </form>
  );
}
