import {Navigate, useParams} from 'react-router-dom';
import {Navigation} from '../../components/navigation/Navigation.tsx';
import {OfferImages} from './OfferImage.tsx';
import {OfferInside} from './OfferInside.tsx';
import {HostInfo} from './HostInfo.tsx';
import {OfferDescription} from './OfferDescription.tsx';
import {NearPlaces} from './NearPlaces.tsx';
import {fetchNearbyAction, fetchOfferAction} from '../../store/apiActions/offersActions.ts';
import {useAppDispatch} from '../../hooks/useAppDispatch.ts';
import {useEffect} from 'react';
import {ReviewsBlock} from './ReviewsBlock.tsx';
import {useAppSelector} from '../../hooks/useAppSelector.ts';
import {getAuthorizationStatus} from '../../store/slices/user/userSelectors.ts';
import {AppRoute, AuthorizationStatus, BookmarkButtonType} from '../../const.ts';
import {getOffer, getOfferErrorStatus, getOfferLoadingStatus} from '../../store/slices/offer/offerSelectors.ts';
import {Spinner} from '../../components/Spinner.tsx';
import {NearPlacesMap} from './NearPlacesMap.tsx';
import {clearOffer} from '../../store/slices/offer/offerSlice.ts';
import {BookmarkButton} from '../../components/BookmarkButton.tsx';


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
