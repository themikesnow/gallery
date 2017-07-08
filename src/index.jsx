import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import reducer from './reducers';

import App from './components/App/App.react';
import {} from './style/css/app.scss';

const middleware = [thunk];

const store = createStore(
  reducer,
  applyMiddleware(...middleware),
);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('content'),
);
