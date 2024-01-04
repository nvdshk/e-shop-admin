import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux/es/exports'
import { store } from './app/store';
import setupInterceptors from './util/setupInterceptors';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
 
    <Provider store={store}>
      <App />
    </Provider>

);

setupInterceptors(store);

