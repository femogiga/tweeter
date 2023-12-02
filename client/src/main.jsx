import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import LoginPage from './components/pages/LoginPage.jsx';
import MainPage from './components/pages/MainPage';

export const Root = () => {
  return(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<App />} />
      <Route path='/home' element={<MainPage />} />
      <Route path='/login' element={<LoginPage />} />
    </Routes>
  </BrowserRouter>)
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);
