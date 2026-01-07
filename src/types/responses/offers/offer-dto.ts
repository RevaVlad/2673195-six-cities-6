import {CityDto} from '../city-dto.ts';
import {Location} from '../../location.ts';
import {UserCompactDto} from '../user-compact-dto.ts';

export type OfferDto = {
  id: string;
  title: string;
  type: string;
  price: number;
  city: CityDto;
  location: Location;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
  description: string;
  bedrooms: number;
  goods: string[];
  host: UserCompactDto;
  images: string[];
  maxAdults: number;
}
