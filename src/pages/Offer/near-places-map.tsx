import {Map} from '../../components/map.tsx';
import {useAppSelector} from '../../hooks/use-app-selector.ts';
import {
  getNearbyPoints,
  getNearbyErrorStatus,
  getNearbyLoadingStatus,
  getOfferCity
} from '../../store/slices/offer/offer-selectors.ts';
import {Spinner} from '../../components/spinner.tsx';
import {Location} from '../../types/location.ts';

export function NearPlacesMap({currentOfferPoint}: { currentOfferPoint: Location }) {
  const loading = useAppSelector(getNearbyLoadingStatus);
  const error = useAppSelector(getNearbyErrorStatus);
  const city = useAppSelector(getOfferCity);
  const nearPlacesPoints = useAppSelector(getNearbyPoints);

  return (
    <div className="offer__map map">
      {loading || error || !city ? <Spinner /> :
        <Map
          city={city}
          points={nearPlacesPoints.slice(0, 3).concat([currentOfferPoint])}
          className={'offer__map map'}
          selectedPoint={currentOfferPoint}
        />}
    </div>);
}
