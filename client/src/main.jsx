import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './components/pages/LoginPage.jsx';
import ProfilePage from './components/pages/ProfilePage.jsx';
import Homepage from './components/pages/HomePage.jsx';
import Explorepage from './components/pages/Explorepage.jsx';
import Bookmarkpage from './components/pages/BookmarkPage.jsx';

export const Root = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='home' element={<Homepage />} />
        <Route path='/profile' element={<ProfilePage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/explore' element={<Explorepage />} />
        <Route path='/bookmarks' element={<Bookmarkpage />} />
      </Routes>
    </BrowserRouter>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);
