import { sortOffers } from './sortOffers';
import { OffersList } from '../types/responses/offers/offersList';
import { SortType } from '../const';

describe('sortOffers', () => {
  const mockOffers: OffersList = [
    {
      id: '1',
      title: 'Offer 1',
      type: 'apartment',
      price: 100,
      city: {
        name: 'Paris',
        location: { latitude: 48.85661, longitude: 2.351499, zoom: 13 }
      },
      location: { latitude: 48.85661, longitude: 2.351499, zoom: 13 },
      isFavorite: false,
      isPremium: false,
      rating: 4.5,
      previewImage: 'img1.jpg'
    },
    {
      id: '2',
      title: 'Offer 2',
      type: 'house',
      price: 200,
      city: {
        name: 'Paris',
        location: { latitude: 48.85661, longitude: 2.351499, zoom: 13 }
      },
      location: { latitude: 48.85661, longitude: 2.351499, zoom: 13 },
      isFavorite: false,
      isPremium: false,
      rating: 4.0,
      previewImage: 'img2.jpg'
    },
    {
      id: '3',
      title: 'Offer 3',
      type: 'room',
      price: 50,
      city: {
        name: 'Paris',
        location: { latitude: 48.85661, longitude: 2.351499, zoom: 13 }
      },
      location: { latitude: 48.85661, longitude: 2.351499, zoom: 13 },
      isFavorite: false,
      isPremium: false,
      rating: 5.0,
      previewImage: 'img3.jpg'
    },
    {
      id: '4',
      title: 'Offer 4',
      type: 'apartment',
      price: 150,
      city: {
        name: 'Paris',
        location: { latitude: 48.85661, longitude: 2.351499, zoom: 13 }
      },
      location: { latitude: 48.85661, longitude: 2.351499, zoom: 13 },
      isFavorite: false,
      isPremium: false,
      rating: 3.5,
      previewImage: 'img4.jpg'
    }
  ];

  it('sorts by Popular correctly', () => {
    const result = sortOffers(mockOffers, SortType.Popular);
    expect(result).toEqual(mockOffers);
  });

  it('sorts by PriceLowToHigh correctly', () => {
    const result = sortOffers(mockOffers, SortType.PriceLowToHigh);
    expect(result).toEqual([
      mockOffers[2],
      mockOffers[0],
      mockOffers[3],
      mockOffers[1]
    ]);
  });

  it('sorts by PriceHighToLow correctly', () => {
    const result = sortOffers(mockOffers, SortType.PriceHighToLow);
    expect(result).toEqual([
      mockOffers[1],
      mockOffers[3],
      mockOffers[0],
      mockOffers[2]
    ]);
  });

  it('sorts by TopRatedFirst correctly', () => {
    const result = sortOffers(mockOffers, SortType.TopRatedFirst);
    expect(result).toEqual([
      mockOffers[2],
      mockOffers[0],
      mockOffers[1],
      mockOffers[3]
    ]);
  });
});
