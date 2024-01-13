import Header from '../header/Header';
import Container from './Container';
import '../body/explore.css';
import SearchIcon from '@mui/icons-material/Search';
import { Link, useNavigate } from 'react-router-dom';
import ExploreNav from '../body/ExploreNav';
import { Button } from '@mui/material';
import Card from '../body/cards/Card';
import { useEffect, useState } from 'react';
import SideNav from './../body/SideNav';
import {
  useLikeBookmarkDataById,
  useTopBookmarkDataById,
} from '../../api/bookmarkedData';

const Bookmarkpage = () => {
  const navigate = useNavigate();

  const {
    isLatestPending,
    error,
    data: latestData,
  } = useTopBookmarkDataById();
  const {
    isLikePending,
    error: likeError,
    data: likeData,
  } = useLikeBookmarkDataById();

  const [data, setData] = useState(latestData);

  const handleTweet = (e, dataToSet) => {
    e.preventDefault();
    setData(dataToSet);
    return;
  };
  useEffect(() => {
    isLatestPending ? 'loading' : setData(latestData);
  }, [latestData, isLatestPending]);

  console.log('Bookmark', latestData);
  console.log('like==>', likeData);

  useEffect(() => {
    const userToken = localStorage.getItem('userData');
    if (!userToken) {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <Container>
      <Header />
      <main className='explore-container'>
        <aside className='explore-nav'>
          <SideNav
            onClickLatest={(e) => handleTweet(e, likeData)}
            onHandleLike={(e) => handleTweet(e, likeData)}
          />
        </aside>
        <div className='explore-content' style={{ marginBlockStart: '1rem' }}>
          <form action='' className='search-form flow-1'>
            <SearchIcon />
            <input type='text' placeholder='Search' />
            <Button variant='contained'>Search</Button>
          </form>
          <div>
            {data &&
              data.map((item) => {
                return <Card key={`like-${item.createdAt}`} {...item} />;
              })}
          </div>
        </div>
      </main>
    </Container>
  );
};

export default Bookmarkpage;
