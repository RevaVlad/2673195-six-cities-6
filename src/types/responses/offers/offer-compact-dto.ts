import {CityDto} from '../city-dto.ts';
import {Location} from '../../location.ts';

export type OfferCompactDto = {
  id: string;
  title: string;
  type: string;
  price: number;
  city: CityDto;
  location: Location;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
  previewImage: string;
}
