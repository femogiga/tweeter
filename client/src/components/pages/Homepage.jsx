import Header from '../header/Header';
import Container from './Container';
import '../header/header.css';
import '../body/home.css';
import Main from '../body/Main';
import Avatar from '../body/cards/Avatar';
import PublicIcon from '@mui/icons-material/Public';
import InsertPhotoOutlinedIcon from '@mui/icons-material/InsertPhotoOutlined';
import { Link } from 'react-router-dom';
import SideNav from '../body/SideNav';
import { Button } from '@mui/material';
import TweetInput from '../body/TweetInput';
import Card from '../body/cards/Card';
import Retweeted from '../body/cards/Retweeted';
import TrendCard from '../body/TrendCard';
import FollowCard from '../body/FollowCard';
import Trends from '../body/Trends';

const Homepage = () => {
  return (
    <Container>
      <Header />

      <div className='home-container'>
        <section className='home-content'>
          <TweetInput />
          <Retweeted />
          <Card />
          <Card />
        </section>
        <aside className='side-content'>
          <Trends />
          <p>Who to follow</p>

          <div
            className=''
            style={{
              padding: '1rem',
              borderRadius: '12px',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
            }}>
            <FollowCard />
            <FollowCard />
          </div>
        </aside>
      </div>
    </Container>
  );
};

export default Homepage;
