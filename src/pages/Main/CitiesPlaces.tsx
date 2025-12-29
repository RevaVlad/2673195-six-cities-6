import {Header} from './Header.tsx';
import {OffersListComponent} from '../../components/OffersListComponent.tsx';
import {OfferCardStyle} from '../../const.ts';
import {Map} from '../../components/Map.tsx';
import {OffersList} from '../../types/responses/offers/offersList.ts';
import {CityName} from '../../types/cityName.ts';
import {useCallback, useMemo, useState} from 'react';
import {Location} from '../../types/location.ts';
import {sortOffers} from '../../utils/sortOffers.ts';
import {useSort} from '../../hooks/useSort.ts';

interface CitiesContentProps {
  city: CityName;
  offers: OffersList;
}

export default function CitiesPlaces({city, offers} : CitiesContentProps) {
  const [selectedPoint, setSelectedPoint] = useState<Location | null>(null);
  const {currentSortType} = useSort();

  const points = offers.map((offer) => offer.location);

  const offersSorted = useMemo(() => sortOffers(offers, currentSortType), [offers, currentSortType]);

  const handleActiveOfferChange = useCallback((location: Location | null) => {
    setSelectedPoint(location);
  }, []);

  return (
    <div className="cities__places-container container">
      <section className="cities__places places">
        <Header
          activeCity={city}
          offersInCityCount={offers.length}
        />
        <OffersListComponent
          offers={offersSorted}
          cardStyle={OfferCardStyle.City}
          onActivePointChange={handleActiveOfferChange}
        />
      </section>
      <div className="cities__right-section">
        <Map
          city={offers[0].city}
          points={points}
          className={'cities__map map'}
          selectedPoint={selectedPoint}
        />
      </div>
    </div>);
}
