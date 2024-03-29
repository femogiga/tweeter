import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { Provider } from 'react-redux';
import { store } from './store.js';
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './components/pages/LoginPage.jsx';
import ProfilePage from './components/pages/ProfilePage.jsx';
import Homepage from './components/pages/HomePage.jsx';
import Explorepage from './components/pages/Explorepage.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Bookmarkpage from './components/pages/Bookmarkpage.jsx';
import Registerpage from './components/pages/Registerpage.jsx';
import SettingsPage from './components/pages/SettingsPage.jsx';

const queryClient = new QueryClient();
export const Root = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/home' element={<Homepage />} />
        {/* <Route path='/home' element={<Homepage />} /> */}

        <Route path='/profile/:id' element={<ProfilePage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/explore' element={<Explorepage />} />
        <Route path='/bookmarks' element={<Bookmarkpage />} />
        <Route path='/register' element={<Registerpage />} />
        <Route path='/settings' element={<SettingsPage />} />
      </Routes>
    </BrowserRouter>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Root />
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>
);
