import { BookmarkButtonType } from '../const';
import { getBookmarkButtonStyle } from './bookmark-button-utils.ts';

describe('getBookmarkButtonStyle', () => {
  it('returns correct styles for NearPlace button type', () => {
    const result = getBookmarkButtonStyle(BookmarkButtonType.NearPlace);

    expect(result).toEqual({
      buttonClass: 'place-card__bookmark-button',
      iconClass: 'place-card__bookmark-icon',
      width: 18,
      height: 19,
    });
  });

  it('returns correct styles for PlaceCard button type', () => {
    const result = getBookmarkButtonStyle(BookmarkButtonType.PlaceCard);

    expect(result).toEqual({
      buttonClass: 'place-card__bookmark-button',
      iconClass: 'place-card__bookmark-icon',
      width: 18,
      height: 19,
    });
  });

  it('returns correct styles for Offer button type', () => {
    const result = getBookmarkButtonStyle(BookmarkButtonType.Offer);

    expect(result).toEqual({
      buttonClass: 'offer__bookmark-button',
      iconClass: 'offer__bookmark-icon',
      width: 31,
      height: 33,
    });
  });

  it('throws error for unknown button type', () => {
    const unknownType = 'unknown' as BookmarkButtonType;

    expect(() => getBookmarkButtonStyle(unknownType)).toThrow(
      'Unknown bookmark button style'
    );
  });
});
