import {Navigate} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../const.ts';
import {ReactElement} from 'react';

type PrivateRouteProps={
  authorizationStatus: AuthorizationStatus;
  children: ReactElement;
}

export function PrivateRoute(props: PrivateRouteProps) {
  const { authorizationStatus, children } = props;

  return (
    authorizationStatus === AuthorizationStatus.Auth
      ? children
      : <Navigate to={AppRoute.Login} />
  );
}
