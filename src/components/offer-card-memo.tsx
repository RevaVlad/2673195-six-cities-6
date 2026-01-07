import {OffersListItem} from '../types/responses/offers/offers-list.ts';
import {AppRoute, OfferCardStyle} from '../const.ts';
import {getBookmarkButtonType, getStylePrefix} from '../utils/offer-card-utils.ts';
import {OfferCompactDto} from '../types/responses/offers/offer-compact-dto.ts';
import {memo} from 'react';
import {Link} from 'react-router-dom';
import {BookmarkButton} from './bookmark-button.tsx';


interface OfferCardProps {
  offer: OffersListItem | OfferCompactDto;
  cardType: OfferCardStyle;
  onMouseEnter: (offerId: string) => void;
  onMouseLeave: () => void;
}

function OfferCardNotMemorized({offer, cardType, onMouseEnter, onMouseLeave}: OfferCardProps) {
  const offerLink = AppRoute.Offer(offer.id);
  const stylePrefix = getStylePrefix(cardType);
  const bookmarkStyle = getBookmarkButtonType(cardType);

  return (
    <article className={`${stylePrefix}__card place-card`} onMouseEnter={() => onMouseEnter(offer.id)} onMouseLeave={onMouseLeave}>
      {
        cardType === OfferCardStyle.City &&
        offer.isPremium &&
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      }
      <div className={`${stylePrefix}__image-wrapper place-card__image-wrapper`}>
        <Link to={offerLink}>
          <img className="place-card__image" src={offer.previewImage} width="260" height="200"
            alt="Place image"
          />
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{offer.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <BookmarkButton offerId={offer.id} isFavorite={offer.isFavorite} styleType={bookmarkStyle}/>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: `${20 * offer.rating}%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={offerLink}>{offer.title}</Link>
        </h2>
        <p className="place-card__type">{offer.type}</p>
      </div>
    </article>
  );
}

export const OfferCardMemo = memo(OfferCardNotMemorized);
