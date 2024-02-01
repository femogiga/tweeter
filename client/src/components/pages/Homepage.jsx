import Header from '../header/Header';
import Container from './Container';
import '../header/header.css';
import '../body/home.css';
import TweetInput from '../body/TweetInput';
import Card from '../body/cards/Card';
import FollowCard from '../body/FollowCard';
import Trends from '../body/Trends';
import WhocanModal from '../body/WhocanModal';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import { useAllTweetData } from '../../api/tweetData';
import { useAllRetweetData } from '../../api/retweetData';
import { useAllTweetDataWithComments } from '../../api/tweetWithCommentData';
import { useAllUserData } from '../../api/userData';
import { useGetTweetBytags, useWhoToFollow } from '../../api/actionData';
import randomGenerator from '../../utils/randomGen';
import { useDispatch, useSelector } from 'react-redux';
import { QueryClient, useQueryClient } from '@tanstack/react-query';
import useActionHandlers from '../../utils/actionHandlers';
import {
  AllLikesForCardStyle,
  AllRetweetCardStyle,
  AllSavesForCardStyle,
} from '../../api/cardActionsData';
import actionhandlerCardStyle from '../../utils/actionHandlerDataForCardStyle';

const Homepage = () => {
  /*
  TODO :replace the data used to render the cards in this  component
    * AllTweetData- fetches all tweets from database
   * alltweets - fetches all tweets with comments
   * whtoFollow - fetches the details of users that can be followed
   * randomGenerator : randomly selects a user to follow

   */

  const [searchParams, setSearchParams] = useSearchParams();

  const dataToRender = useSelector((state) => state.home.dataToRender);
  //console.log('dataToRender', dataToRender);
  const navigate = useNavigate();
  //const { tags } = useParams();
  let tags = searchParams.get('tags');
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
  const queryClient = useQueryClient();

  // useEffect(() => {
  //   queryClient.removeQueries(['tweetByTag']);
  // }, [queryClient, tags]);
  const { isPending: whoTofollowPending, data: whoToFollowData } =
    useWhoToFollow();
  const { handleLikeClick, handleRetweetClick, handleSaveClick } =
    useActionHandlers();
  const { data: tweetByTagData, refetch } = useGetTweetBytags(tags);
  const [pageData, setPageData] = useState(allTweetDataWithComment);
  useEffect(() => {
    setPageData(allTweetDataWithComment);
  }, [allTweetDataWithComment]);

  const handleTrendClick = (e) => {
    //e.preventDefault();
    setPageData(tweetByTagData);
    refetch();
  };
  // console.log('looog', tags);
  const length = whoTofollowPending ? 'Loading..' : whoToFollowData?.length - 1;
  const [firstNum, secondNum] = useMemo(() => randomGenerator(length));
  let first = whoTofollowPending ? 'Loading' : whoToFollowData[firstNum];
  let second = whoTofollowPending ? 'Loading  ' : whoToFollowData[secondNum];
  //console.log('who to ', whoToFollowData);
  console.log('allTweetWithComment', allTweetDataWithComment);

  //console.log('who to follow ====> ', first);
  /*
  TODO:RetweetState which is found via retweetdata and used to set the stat

*/
  // const { mutate } = useCreateLikeMutation();

  // const handleLikeClick = (e, id) => {
  //   e.preventDefault();
  //   const data = { id };
  //   const response = mutate(data);
  // };

  // const { isPending: isRetweetDataPending, data: retweetData } =
  //   AllRetweetCardStyle();

  // const { isPending: isSavedDataPending, data: savesData } =
  //   AllSavesForCardStyle();

  // const { isPending: isLikesDataPending, data: likesData } =
  //   AllLikesForCardStyle();
  const { retweetData, likesData, savesData } = actionhandlerCardStyle();

  useEffect(() => {
    const userToken = localStorage.getItem('userData');
    const parsedUser = JSON.parse(userToken);
    const id = parsedUser?.id;
    if (!userToken) {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <Container>
      <Header setPageData={setPageData} />

      <div className='home-container'>
        <section className='home-content'>
          <TweetInput />
          <WhocanModal />
          {/* <Retweeted /> */}

          {pageData &&
            pageData
              .filter((item) => {
                if (tags) {
                  return item.content.includes(tags);
                } else {
                  return true;
                }
              })
              .map((tweet) => {
                const { firstName, lastName, photo } = tweet;

                const key = tweet?.id + tweet.createdAt;

                return (
                  <Card
                    key={`Card${key}`}
                    onHandleLike={(e, id) => handleLikeClick(e, tweet?.id)}
                    onHandleRetweet={(e, id) =>
                      handleRetweetClick(e, tweet?.id)
                    }
                    onHandleSave={(e, id) => handleSaveClick(e, tweet?.id)}
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
                    retweetState={retweetData?.find(
                      (retweet) => retweet?.tweetId === tweet?.id
                    )}
                    savedState={savesData?.find(
                      (saved) => saved?.tweetId === tweet?.id
                    )}
                    likeState={likesData?.find(
                      (like) => like?.tweetId === tweet?.id
                    )}
                    likeCount={tweet.like.length}
                    savedCount={tweet.saved.length}
                  />
                );
              })}
          {/* <Card /> */}
        </section>
        <aside className='side-content'>
          <Trends handleTrendClick={(e) => handleTrendClick(e)} />
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
