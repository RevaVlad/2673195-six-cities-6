import React from 'react';
import ReactDOM from 'react-dom/client';
import {App} from './app.tsx';
import {Provider} from 'react-redux';
import {store} from './store/store.ts';
import {ToastContainer} from 'react-toastify';
import {HistoryRouter} from './components/history-router.tsx';
import browserHistory from './browser-history.ts';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <HistoryRouter history={browserHistory}>
        <ToastContainer/>
        <App/>
      </HistoryRouter>
    </Provider>
  </React.StrictMode>
);
