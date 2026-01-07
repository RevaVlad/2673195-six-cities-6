import {useEffect} from 'react';
import {Main} from './pages/Main/main.tsx';
import {Route, Routes} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from './const.ts';
import {Login} from './pages/Login/login.tsx';
import {Favourites} from './pages/Favourites/favourites.tsx';
import {Offer} from './pages/Offer/offer.tsx';
import {NotFoundPage} from './pages/NotFoundPage/not-found-page.tsx';
import {PrivateRoute} from './components/private-route.tsx';
import {useAppSelector} from './hooks/use-app-selector.ts';
import {getAuthorizationStatus} from './store/slices/user/user-selectors.ts';
import {store} from './store/store.ts';
import {checkAuthAction} from './store/apiActions/user-actions.ts';
import {fetchOffersAction} from './store/apiActions/offers-actions.ts';

export function App() {
  const authStatus = useAppSelector(getAuthorizationStatus);
  store.dispatch(checkAuthAction());
  store.dispatch(fetchOffersAction());

  useEffect(() => {
    if (authStatus === AuthorizationStatus.Auth){
      store.dispatch(fetchOffersAction());
    }
  }, [authStatus]);

  return (
    <Routes>
      <Route
        path={AppRoute.Main}
        element={<Main/>}
      />
      <Route
        path={AppRoute.Login}
        element={<Login/>}
      />
      <Route
        path={AppRoute.Favourites}
        element={
          <PrivateRoute authorizationStatus={authStatus}>
            <Favourites/>
          </PrivateRoute>
        }
      />
      <Route
        path={AppRoute.Offer(':id')}
        element={<Offer/>}
      />
      <Route
        path="*"
        element={<NotFoundPage/>}
      />
    </Routes>
  );
}
