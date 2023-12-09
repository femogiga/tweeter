import Header from '../header/Header';
import Container from './Container';
import '../body/explore.css';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';
import ExploreNav from '../body/ExploreNav';
import { Button } from '@mui/material';
import Card from '../body/cards/Card';

const Bookmarkpage = () => {
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

export default Bookmarkpage;
