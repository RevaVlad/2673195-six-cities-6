import {Navigate} from 'react-router-dom';
import {Navigation} from '../../components/navigation/navigation.tsx';
import {Tabs} from './tabs.tsx';
import {useAppSelector} from '../../hooks/use-app-selector.ts';
import {CityName} from '../../types/city-name.ts';
import {
  getOffersErrorStatus,
  getOffersInCity,
  getOffersLoadingStatus
} from '../../store/slices/offers/offers-selectors.ts';
import {getCityName} from '../../store/slices/city/city-selectors.ts';
import {Spinner} from '../../components/spinner.tsx';
import CitiesPlaces from './cities-places.tsx';
import {SortProvider} from '../../hocs/sort-context.tsx';
import {MainEmpty} from './main-empty.tsx';

export function Main() {
  const isLoading = useAppSelector(getOffersLoadingStatus);
  const hasError = useAppSelector(getOffersErrorStatus);

  const city: CityName = useAppSelector(getCityName);
  const offers = useAppSelector(getOffersInCity);

  return (
    <div className="page page--gray page--main">
      <Navigation/>

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <Tabs activeCity={city}/>
        <div className="cities">
          {
            isLoading && <Spinner/>
          }
          {
            (hasError) && <Navigate to="/*"/>
          }
          {
            !isLoading && !hasError && offers.length > 0 &&
            <SortProvider>
              <CitiesPlaces city={city} offers={offers}/>
            </SortProvider>
          }
          {
            !isLoading && !hasError && offers.length === 0 &&
            <MainEmpty/>
          }
        </div>
      </main>
    </div>
  );
}
