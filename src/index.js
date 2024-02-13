import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import RecipeContextProvider from './store/recipe-context';

import './styles/main.scss';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RecipeContextProvider>
    <App />
  </RecipeContextProvider>
);

