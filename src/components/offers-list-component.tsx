import {useCallback} from 'react';
import {OffersList} from '../types/responses/offers/offers-list.ts';
import {OfferCardMemo} from './offer-card-memo.tsx';
import {OfferCardStyle} from '../const.ts';
import {OfferCompactDto} from '../types/responses/offers/offer-compact-dto.ts';
import {Location} from '../types/location.ts';

interface OffersListProps {
  offers: OffersList | OfferCompactDto[];
  cardStyle: OfferCardStyle;
  onActivePointChange: (location: Location | null) => void;
}

function getClassName(cardType: OfferCardStyle): string {
  switch (cardType) {
    case OfferCardStyle.City:
      return 'cities__places-list places__list tabs__content';
    case OfferCardStyle.NearPlace:
      return 'near-places__list places__list';
    default:
      return 'places__list';
  }
}

export function OffersListComponent({offers, cardStyle, onActivePointChange}: OffersListProps) {
  const className = getClassName(cardStyle);

  const handleMouseEnter = useCallback((offerId: string) => {
    const offer = offers.find((x) => x.id === offerId);
    if (offer){
      onActivePointChange(offer.location);
    }
  }, [offers, onActivePointChange]);

  const handleMouseLeave = useCallback(() => {
    onActivePointChange(null);
  }, [onActivePointChange]);

  return (
    <div className={className}>
      {offers.map((offer) => (
        <OfferCardMemo
          key={offer.id}
          cardType={cardStyle}
          offer={offer}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        />
      ))}
    </div>);
}
