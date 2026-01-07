import { OfferCardStyle } from '../const';
import { getStylePrefix, getBookmarkButtonType } from './offer-card-utils.ts';
import { BookmarkButtonType } from '../const';

describe('getStylePrefix', () => {
  it('returns correct prefix for City card type', () => {
    const result = getStylePrefix(OfferCardStyle.City);

    expect(result).toBe('cities');
  });

  it('returns correct prefix for NearPlace card type', () => {
    const result = getStylePrefix(OfferCardStyle.NearPlace);

    expect(result).toBe('near-places');
  });
});

describe('getBookmarkButtonType', () => {
  it('returns correct button type for City card type', () => {
    const result = getBookmarkButtonType(OfferCardStyle.City);

    expect(result).toBe(BookmarkButtonType.PlaceCard);
  });

  it('returns correct button type for NearPlace card type', () => {
    const result = getBookmarkButtonType(OfferCardStyle.NearPlace);

    expect(result).toBe(BookmarkButtonType.NearPlace);
  });
});
