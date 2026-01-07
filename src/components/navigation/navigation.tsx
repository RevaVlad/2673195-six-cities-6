import {AppRoute, AuthorizationStatus} from '../../const.ts';
import {useAppSelector} from '../../hooks/use-app-selector.ts';
import {getAuthorizationStatus} from '../../store/slices/user/user-selectors.ts';
import {NavigationProfile} from './navigation-profile.tsx';
import {NavigationLogin} from './navigation-login.tsx';
import {Link} from 'react-router-dom';

export function Navigation() {
  const authStatus = useAppSelector(getAuthorizationStatus);

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link className="header__logo-link" to={AppRoute.Main}>
              <img className="header__logo" src="/img/logo.svg" alt="6 cities logo" width="81" height="41"/>
            </Link>
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              {authStatus === AuthorizationStatus.Auth ? <NavigationProfile/> : <NavigationLogin/>}
            </ul>
          </nav>
        </div>
      </div>
    </header>);
}

