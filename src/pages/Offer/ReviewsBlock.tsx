import {ReviewsList} from './ReviewsList.tsx';
import {ReviewForm} from './ReviewForm.tsx';
import {useAppSelector} from '../../hooks/useAppSelector.ts';
import {
  getCommentsErrorStatus, getReviewsFiltered,
  getCommentsLoadingStatus, getTotalComments
} from '../../store/slices/comments/commentsSelectors.ts';
import {useAppDispatch} from '../../hooks/useAppDispatch.ts';
import {fetchCommentsAction} from '../../store/apiActions/commentsActions.ts';
import {useEffect} from 'react';
import {Spinner} from '../../components/Spinner.tsx';

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
