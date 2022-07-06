import React from 'react';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './store';
import * as ReactDOMClient from 'react-dom/client';
import './index.css';

const root = ReactDOMClient.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
