import {Link} from 'react-router-dom';
import {AppRoute} from '../../const.ts';

export function NotFoundPage(){
  return (
    <div style={{ textAlign: 'center' }}>
      <h1>404</h1>
      <p>Извините, странице по такому адресу не найдена</p>
      <p>
        <Link to={AppRoute.Main} style={{textDecoration: 'underline', color: 'blue', fontStyle: 'italic'}}>
          Вернутся на главную страницу
        </Link>
      </p>
    </div>
  );
}
