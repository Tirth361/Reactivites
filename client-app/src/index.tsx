import React from 'react';
import ReactDOM from 'react-dom/client';
import 'semantic-ui-css/semantic.min.css'
import App from './app/layout/App';
import '../src/app/layout/index.css'
import { store, StoreContext } from './app/stores/store';
import { BrowserRouter } from 'react-router-dom'
import 'react-calendar/dist/Calendar.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StoreContext.Provider value={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StoreContext.Provider>
);