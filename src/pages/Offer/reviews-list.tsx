import {ReviewListData} from '../../types/reviews/review-list-data.ts';
import {Review} from './review.tsx';

export function ReviewsList({reviews}: { reviews: ReviewListData }) {
  return (
    <ul className="reviews__list">
      {reviews.map((review) => (
        <Review key={review.id} review={review}/>
      ))}
    </ul>);
}
