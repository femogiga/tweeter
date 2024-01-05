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
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAllTweetData } from '../../api/tweetData';
import { useAllRetweetData } from '../../api/retweetData';
import { useAllComments, useAllCommentsByTweetId } from '../../api/commentData';

const Homepage = () => {
  const {
    isPending: isAllTweetPending,
    error: allTweetError,
    data: allTweetData,
  } = useAllTweetData();
  const { isPending, error, data: allRetweetData } = useAllRetweetData();

  const {
    isPending: isCommentByAuthorIdPending,
    error: isErrorPrending,
    data: commentData,
  } = useAllComments();
  console.log('commentData', commentData);
  console.log('retweet===>', allRetweetData);
  console.log('alltweet===>', allTweetData);

  const navigate = useNavigate();
  useEffect(() => {
    const userToken = localStorage.getItem('userData');
    if (!userToken) {
      navigate('/login');
    }
  }, [navigate]);
  // let b = commentData.find(ele => ele?.tweetId === 4)
  //console.log('b=====>',b)
  return (
    <Container>
      <Header />

      <div className='home-container'>
        <section className='home-content'>
          <TweetInput />
          <WhocanModal />
          {/* <Retweeted /> */}
          {allTweetData &&
            allTweetData.map((tweet) => {
              const { firstName, lastName, photo } = tweet;
              let author = { firstName, lastName, photo };
              const key = tweet?.id + tweet.createdAt;

              return (
                <Card
                  key={`Card${key}`}
                  {...tweet}
                  photo={tweet?.photo}
                  author={author}
                  tweetId={tweet?.tweetId}
                  
                />
              );
            })}
          {/* <Card /> */}
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
