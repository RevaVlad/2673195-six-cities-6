import {BookmarkButtonType} from '../const.ts';
import {BookmarkButtonStyle} from '../types/styles/bookmark-button-style.ts';

export function getBookmarkButtonStyle(style: BookmarkButtonType): BookmarkButtonStyle {
  switch (style) {
    case BookmarkButtonType.NearPlace:
    case BookmarkButtonType.PlaceCard:
      return {
        buttonClass: 'place-card__bookmark-button',
        iconClass: 'place-card__bookmark-icon',
        width: 18,
        height: 19,
      };
    case BookmarkButtonType.Offer:
      return {
        buttonClass: 'offer__bookmark-button',
        iconClass: 'offer__bookmark-icon',
        width: 31,
        height: 33,
      };
    default:
      throw new Error('Unknown bookmark button style');
  }
}
