import {Map} from '../../components/Map.tsx';
import {useAppSelector} from '../../hooks/useAppSelector.ts';
import {
  getNearbyPoints,
  getNearbyErrorStatus,
  getNearbyLoadingStatus,
  getOfferCity
} from '../../store/slices/offer/offerSelectors.ts';
import {Spinner} from '../../components/Spinner.tsx';
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
