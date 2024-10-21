import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Nutrient from './pages/Nutrient';
import Recipe from './pages/Recipe';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

let route=createBrowserRouter(
  [
    {
      path:'/',
      element:<App/>
    },
    {
      path:'nutrient',
      element:<Nutrient/>
    },
    {
      path:'recipe',
      element:<Recipe/>
    }
  ]
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={route}/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
