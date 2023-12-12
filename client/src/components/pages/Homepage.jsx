import Header from '../header/Header';
import Container from './Container';
import '../header/header.css';
import '../body/home.css';
import TweetInput from '../body/TweetInput';
import Card from '../body/cards/Card';
import Retweeted from '../body/cards/Retweeted';
import FollowCard from '../body/FollowCard';
import Trends from '../body/Trends';
import WhocanModal from '../body/WhocanModal';

const Homepage = () => {
  return (
    <Container>
      <Header />

      <div className='home-container'>
        <section className='home-content' >
          <TweetInput />
          <WhocanModal />
          <Retweeted />
          <Card />
          <Card />
        </section>
        <aside className='side-content'>
          <Trends />
          <div
            className=''
            style={{
              padding: '1rem',
              borderRadius: '12px',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
              backgroundColor: 'white !important',
            }}>
            <p
              style={{
                paddingBlock: '.2rem',
                color: '#4F4F4F',
              }}>
              Who to follow
            </p>

            <FollowCard />
            <FollowCard />
          </div>
        </aside>
      </div>
    </Container>
  );
};

export default Homepage;
