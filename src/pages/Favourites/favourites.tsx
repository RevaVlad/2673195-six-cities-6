import {Navigation} from '../../components/navigation/navigation.tsx';
import {CityFavourites} from './city-favourites.tsx';
import {useAppSelector} from '../../hooks/use-app-selector.ts';
import {
  getFavourites,
  getFavouritesErrorStatus,
  getFavouritesLoadingStatus
} from '../../store/slices/favourites/favourites-selectors.ts';
import {AppRoute, CITIES_LIST} from '../../const.ts';
import {Link, Navigate} from 'react-router-dom';
import {useEffect} from 'react';
import {useAppDispatch} from '../../hooks/use-app-dispatch.ts';
import {fetchFavouriteAction} from '../../store/apiActions/favourite-actions.ts';
import {FavoritesEmpty} from './favorites-empty.tsx';

export function Favourites() {
  const favorites = useAppSelector(getFavourites);
  const isFavouritesLoading = useAppSelector(getFavouritesLoadingStatus);
  const hasError = useAppSelector(getFavouritesErrorStatus);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!isFavouritesLoading && hasError){
      dispatch(fetchFavouriteAction());
    }
  }, [dispatch, isFavouritesLoading, hasError]);

  if (!isFavouritesLoading) {
    return <>Загрузка</>;
  }

  if (hasError) {
    return <Navigate to={AppRoute.NotFound}/>;
  }

  return (
    <div className="page">
      <Navigation/>

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            {
              favorites.length > 0
                ?
                <>
                  <h1 className="favorites__title">Saved listing</h1>
                  <ul className="favorites__list">
                    {CITIES_LIST.map((cityWithOffer) => (
                      <CityFavourites cityName={cityWithOffer} key={cityWithOffer}/>
                    ))}
                  </ul>
                </>
                : <FavoritesEmpty/>
            }
          </section>
        </div>
      </main>
      <footer className="footer container">
        <Link className="footer__logo-link" to={AppRoute.Main}>
          <img className="footer__logo" src="/img/logo.svg" alt="6 cities logo" width="64" height="33"/>
        </Link>
      </footer>
    </div>
  );
}
