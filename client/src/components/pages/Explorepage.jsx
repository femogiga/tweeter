import Header from '../header/Header';
import Container from './Container';
import '../body/explore.css';
import SearchIcon from '@mui/icons-material/Search';
import { Link, useNavigate } from 'react-router-dom';
import ExploreNav from './../body/ExploreNav';
import { Button } from '@mui/material';
import Card from '../body/cards/Card';
import { useEffect, useState } from 'react';

const Explorepage = () => {
  //const { isPending, error, data } = useCard()
  //console.log('cardDataCentral',data)
  const navigate = useNavigate();
  useEffect(() => {
    const userToken = localStorage.getItem('userData');
    // setToken(userToken);
    if (!userToken) {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <Container>
      <Header />
      <main className='explore-container'>
        <aside className='explore-nav'>
          <ExploreNav />
        </aside>
        <div className='explore-content' style={{ marginBlockStart: '1rem' }}>
          <form action='' className='search-form flow-1'>
            <SearchIcon />
            <input type='text' placeholder='Search' />
            <Button variant='contained'>Search</Button>
          </form>
          <div>
            <Card />
            <Card />
          </div>
        </div>
      </main>
    </Container>
  );
};

export default Explorepage;
