import {Navigation} from '../../components/navigation/Navigation.tsx';
import {Tabs} from './Tabs.tsx';
import {useAppSelector} from '../../hooks/useAppSelector.ts';
import {CityName} from '../../types/cityName.ts';
import {
  getOffersErrorStatus,
  getOffersInCity,
  getOffersLoadingStatus
} from '../../store/slices/offers/offersSelectors.ts';
import {getCityName} from '../../store/slices/city/citySelectors.ts';
import {Navigate} from 'react-router-dom';
import {Spinner} from '../../components/Spinner.tsx';
import CitiesPlaces from './CitiesPlaces.tsx';
import {SortProvider} from '../../hocs/SortContext.tsx';
import {MainEmpty} from './MainEmpty.tsx';

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
