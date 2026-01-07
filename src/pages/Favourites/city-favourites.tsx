import {FavouriteOffer} from './favourite-offer.tsx';
import {useAppSelector} from '../../hooks/use-app-selector.ts';
import {getFavouritesInCity} from '../../store/slices/favourites/favourites-selectors.ts';
import {CityName} from '../../types/city-name.ts';

export function CityFavourites({cityName}: { cityName: CityName }) {
  const favourites = useAppSelector((state) =>
    getFavouritesInCity(state, cityName));

  if (favourites.length === 0) {
    return null;
  }

  return (
    <li className="favorites__locations-items">
      <div className="favorites__locations locations locations--current">
        <div className="locations__item">
          <a className="locations__item-link" href="#">
            <span>{cityName}</span>
          </a>
        </div>
      </div>
      <div className="favorites__places">
        {favourites.map((offer) => <FavouriteOffer offer={offer} key={offer.id}/>)}
      </div>
    </li>);
}
