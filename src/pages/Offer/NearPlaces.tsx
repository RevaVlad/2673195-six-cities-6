import {OfferCardStyle} from '../../const.ts';
import {OffersListComponent} from '../../components/OffersListComponent.tsx';
import {useAppSelector} from '../../hooks/useAppSelector.ts';
import {getNearbyOffers} from '../../store/slices/offer/offerSelectors.ts';

export function NearPlaces() {
  const offers = useAppSelector(getNearbyOffers);
  return (
    <div className="container">
      <section className="near-places places">
        <h2 className="near-places__title">Other places in the neighbourhood</h2>
        <OffersListComponent
          offers={offers.slice(0, 3)}
          cardStyle={OfferCardStyle.NearPlace}
          onActivePointChange={() => {}}
        />
      </section>
    </div>
  );
}
