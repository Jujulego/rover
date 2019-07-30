import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import { StylesProvider } from '@material-ui/styles';

import App from 'components/App';
import * as serviceWorker from 'serviceWorker';
import store from 'store';

import 'index.css';

// Application
render((
  <StylesProvider injectFirst>
    <Provider store={store}>
      <App />
    </Provider>
  </StylesProvider>
), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
