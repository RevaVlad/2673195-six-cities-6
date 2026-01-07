import {Navigate, useParams} from 'react-router-dom';
import {Navigation} from '../../components/navigation/navigation.tsx';
import {OfferImages} from './offer-image.tsx';
import {OfferInside} from './offer-inside.tsx';
import {HostInfo} from './host-info.tsx';
import {OfferDescription} from './offer-description.tsx';
import {NearPlaces} from './near-places.tsx';
import {fetchNearbyAction, fetchOfferAction} from '../../store/apiActions/offers-actions.ts';
import {useAppDispatch} from '../../hooks/use-app-dispatch.ts';
import {useEffect} from 'react';
import {ReviewsBlock} from './reviews-block.tsx';
import {useAppSelector} from '../../hooks/use-app-selector.ts';
import {getAuthorizationStatus} from '../../store/slices/user/user-selectors.ts';
import {AppRoute, AuthorizationStatus, BookmarkButtonType} from '../../const.ts';
import {getOffer, getOfferErrorStatus, getOfferLoadingStatus} from '../../store/slices/offer/offer-selectors.ts';
import {Spinner} from '../../components/spinner.tsx';
import {NearPlacesMap} from './near-places-map.tsx';
import {clearOffer} from '../../store/slices/offer/offer-slice.ts';
import {BookmarkButton} from '../../components/bookmark-button.tsx';


export function Offer() {
  const {id} = useParams();
  const authStatus = useAppSelector(getAuthorizationStatus);
  const dispatch = useAppDispatch();

  const offer = useAppSelector(getOffer);
  const loading = useAppSelector(getOfferLoadingStatus);
  const error = useAppSelector(getOfferErrorStatus);


  useEffect(() => {
    if (id) {
      dispatch(fetchOfferAction(id)).then((result) => {
        if (fetchOfferAction.fulfilled.match(result)) {
          dispatch(fetchNearbyAction(id));
        }
      });
    }

    return () => {
      dispatch(clearOffer());
    };
  }, [dispatch, id]);

  if (loading) {
    return <Spinner/>;
  }

  if (error) {
    return <Navigate to={AppRoute.NotFound}/>;
  }

  if (!offer) {
    return null;
  }

  const host = offer.host;

  return (
    <div className="page">
      <Navigation/>
      <main className="page__main page__main--offer">
        <section className="offer">
          <OfferImages imageUrls={offer.images}/>
          <div className="offer__container container">
            <div className="offer__wrapper">
              <div className="offer__mark">
                <span>Premium</span>
              </div>
              <div className="offer__name-wrapper">
                <h1 className="offer__name">
                  {offer.title}
                </h1>
                <BookmarkButton offerId={offer.id} isFavorite={offer.isFavorite} styleType={BookmarkButtonType.Offer}/>
              </div>
              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span style={{width: `${(offer.rating * 20)}%`}}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">{offer.rating}</span>
              </div>
              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">
                  {offer.type}
                </li>
                <li className="offer__feature offer__feature--bedrooms">
                  {offer.bedrooms} {offer.bedrooms > 1 ? 'Bedrooms' : 'Bedroom'}
                </li>
                <li className="offer__feature offer__feature--adults">
                  Max {offer.maxAdults} {offer.maxAdults > 1 ? 'adults' : 'adult'}
                </li>
              </ul>
              <div className="offer__price">
                <b className="offer__price-value">&euro;{offer.price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>

              <OfferInside inside={offer.goods}/>

              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>
                <HostInfo host={host}/>
                <OfferDescription description={offer.description}/>
              </div>
              {authStatus === AuthorizationStatus.Auth && <ReviewsBlock offerId={offer.id}/>}
            </div>
          </div>
          <NearPlacesMap currentOfferPoint={offer.location}/>
        </section>
        <NearPlaces />
      </main>
    </div>
  );
}
