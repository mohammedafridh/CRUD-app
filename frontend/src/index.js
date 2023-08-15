import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './main/App';
import {BrowserRouter} from 'react-router-dom'
import { DetailsContextProvider } from './contexts/DetailsContext';
// import { Provider } from 'react-redux'
// import store from '../src/redux/store'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <DetailsContextProvider>
        <App />
      </DetailsContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);

