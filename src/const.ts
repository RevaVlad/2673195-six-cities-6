import {CityName} from './types/city-name.ts';

export const BACKEND_URL = 'https://14.design.htmlacademy.pro/six-cities';

export const REQUEST_TIMEOUT = 5000;

export const AppRoute = {
  Main: '/',
  Login: '/login',
  Favourites: '/favourites',
  Offer: (id: string) => `/offer/${id}`,
  NotFound: '/*'
};

export const APIRoute = {
  Login: '/login',
  Logout: '/logout',
  Offers: '/offers',
  Offer: (id: string) => `/offers/${id}`,
  OffersNearby: (id: string) => `/offers/${id}/nearby`,
  Comments: (offerId: string) => `/comments/${offerId}/`,
  Favourite: '/favorite',
  ChangeFavouriteStatus: (offerId: string, status: number) => `/favorite/${offerId}/${status}`,
};

export enum NameSpace {
  Offer = 'OFFER',
  Offers = 'OFFERS',
  User = 'USER',
  Comments = 'COMMENTS',
  Favourites = 'Favourites',
  City = 'CITY',
}

export enum AuthorizationStatus {
  Unknown,
  Auth,
  NotAuth
}

export enum OfferCardStyle {
  City,
  NearPlace
}

export enum BookmarkButtonType {
  PlaceCard = 'PlaceCard',
  Offer = 'Offer',
  NearPlace = 'NearPlace',
}

export enum SortType {
  Popular = 'Popular',
  PriceLowToHigh = 'Price: low to high',
  PriceHighToLow = 'Price: high to low',
  TopRatedFirst = 'Top rated first',
}

export const SORT_OPTIONS = [
  SortType.Popular,
  SortType.PriceLowToHigh,
  SortType.PriceHighToLow,
  SortType.TopRatedFirst,
] as const;

export const CITIES = Object.freeze({
  Paris: 'Paris',
  Cologne: 'Cologne',
  Brussels: 'Brussels',
  Amsterdam: 'Amsterdam',
  Hamburg: 'Hamburg',
  Dusseldorf: 'Dusseldorf'
});

export const CITIES_LIST: ReadonlyArray<CityName> = Object.keys(CITIES) as ReadonlyArray<CityName>;

export const URL_MARKER_DEFAULT = '/img/pin.svg';

export const URL_MARKER_SELECTED = '/img/pin-active.svg';
