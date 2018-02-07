import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './css/App.css';
import AppR from './components/app';
import { store } from './store/store';


ReactDOM.render(
  <Provider store={store}>
    <AppR />
  </Provider>,
  document.getElementById('root'),
);

