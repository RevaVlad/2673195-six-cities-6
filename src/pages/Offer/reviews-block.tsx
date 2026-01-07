import {ReviewsList} from './reviews-list.tsx';
import {ReviewForm} from './review-form.tsx';
import {useAppSelector} from '../../hooks/use-app-selector.ts';
import {
  getCommentsErrorStatus, getReviewsFiltered,
  getCommentsLoadingStatus, getTotalComments
} from '../../store/slices/comments/comments-selectors.ts';
import {useAppDispatch} from '../../hooks/use-app-dispatch.ts';
import {fetchCommentsAction} from '../../store/apiActions/comments-actions.ts';
import {useEffect} from 'react';
import {Spinner} from '../../components/spinner.tsx';

export function ReviewsBlock({offerId} : {offerId: string}) {
  const commentsIsLoading = useAppSelector(getCommentsLoadingStatus);
  const commentsHasError = useAppSelector(getCommentsErrorStatus);
  const reviews = useAppSelector(getReviewsFiltered);
  const totalComments = useAppSelector(getTotalComments);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCommentsAction(offerId));
  }, [dispatch, offerId]);

  if (commentsIsLoading) {
    return <Spinner />;
  }

  return (
    <section className="offer__reviews reviews">
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{totalComments}</span></h2>
      {!commentsHasError && <ReviewsList reviews={reviews}/>}
      <ReviewForm offerId={offerId}/>
    </section>);
}
