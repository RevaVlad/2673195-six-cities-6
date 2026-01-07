import {BookmarkButtonType, OfferCardStyle} from '../const.ts';

export function getStylePrefix(cardType: OfferCardStyle): string {
  switch (cardType) {
    case OfferCardStyle.City:
      return 'cities';
    case OfferCardStyle.NearPlace:
      return 'near-places';
  }
}

export function getBookmarkButtonType(cardType: OfferCardStyle): BookmarkButtonType {
  switch (cardType) {
    case OfferCardStyle.NearPlace:
      return BookmarkButtonType.NearPlace;
    case OfferCardStyle.City:
      return BookmarkButtonType.PlaceCard;
  }
}
