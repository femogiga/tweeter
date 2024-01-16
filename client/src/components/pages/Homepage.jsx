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
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAllTweetData } from '../../api/tweetData';
import { useAllRetweetData } from '../../api/retweetData';
import { useAllComments, useAllCommentsByTweetId } from '../../api/commentData';
import { useAllTweetDataWithComments } from '../../api/tweetWithCommentData';
import { useAllUserData } from '../../api/userData';
import { useGetTweetBytags, useWhoToFollow } from '../../api/actionData';
import randomGenerator from '../../utils/randomGen';

const Homepage = () => {
  /*
  TODO :replace the data used to render the cards in this  component
    * AllTweetData- fetches all tweets from database
   * alltweets - fetches all tweets with comments
   * whtoFollow - fetches the details of users that can be followed
   * randomGenerator : randomly selects a user to follow

   */

  const { tags } = useParams();
  const {
    isPending: isAllTweetPending,
    error: allTweetError,
    data: allTweetData,
  } = useAllTweetData();
  const { isPending, error, data: allRetweetData } = useAllRetweetData();

  const {
    isPending: isCommentByAuthorIdPending,
    error: isErrorPrending,
    data: allTweetDataWithComment,
  } = useAllTweetDataWithComments();
  const { isPending: isAllUserDataPending, data: allUsers } = useAllUserData();

  const { isPending: whoTofollowPending, data: whoToFollowData } =
    useWhoToFollow();

  const { data: tweetByTagData } = useGetTweetBytags();

  console.log('getTweetByTags', tweetByTagData);

  const length = whoTofollowPending ? 'Loading..' : whoToFollowData?.length - 1;
  const [firstNum, secondNum] = randomGenerator(length);
  let first = whoTofollowPending ? 'Loading' : whoToFollowData[firstNum];
  let second = whoTofollowPending ? 'Loading  ' : whoToFollowData[secondNum];
  const [pageData, setPageData] = useState(allTweetDataWithComment);
  //console.log('who to ', whoToFollowData);
  //console.log('allTweetWithComment', allTweetDataWithComment);
  //console.log('retweet===>', allRetweetData);
  //console.log('alltweet===>', allTweetData);
  const handleTrendClick = (e, tag) => {
    //e.preventDefault()
    // navigate(`/home/${tags}`)
    //setPageData(tweetByTagData);
    // window.location.reload();
  };

  useEffect(() => {
    setPageData(tweetByTagData);
  },[tags,tweetByTagData])

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
          {pageData &&
            pageData.map((tweet) => {
              const { firstName, lastName, photo } = tweet;

              const key = tweet?.id + tweet.createdAt;

              return (
                <Card
                  key={`Card${key}`}
                  {...tweet}
                  // photo={tweet?.photo}
                  author={
                    allUsers &&
                    allUsers.find((user) => user?.id === tweet?.authorid)
                  }
                  user={
                    allUsers &&
                    allUsers.find((user) => user?.id == tweet?.authorid)
                  }
                  tweetId={tweet?.tweetId}
                  id={tweet?.id}
                />
              );
            })}
          {/* <Card /> */}
        </section>
        <aside className='side-content'>
          <Trends onHandleTrendClick={handleTrendClick} />
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

            <FollowCard {...first} />
            <FollowCard {...second} />
          </div>
        </aside>
      </div>
    </Container>
  );
};

export default Homepage;
