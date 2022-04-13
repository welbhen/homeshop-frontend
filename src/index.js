import React from 'react';
import ReactDOM from 'react-dom';
import MyRoutes from './routes';
import { store } from './store';
import { persistor } from './store';
import { Provider } from 'react-redux';

/* NEW */
import { PersistGate } from 'redux-persist/integration/react'
/* ### */

ReactDOM.render(
  <Provider store={store}>
    
    <PersistGate loading={null} persistor={persistor}>

      <MyRoutes />

    </PersistGate>

  </Provider>,
  document.getElementById('root')
);