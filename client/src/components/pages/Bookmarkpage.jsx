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
  useLatestBookmarkDataById,
  useLikeBookmarkDataById,
  useMediaBookmarkData,
  useTweetBookmarkDataById,
} from '../../api/bookmarkedData';
import { useAllUserData } from '../../api/userData';
import useActionHandlers from '../../utils/actionHandlers';
import actionhandlerCardStyle from '../../utils/actionHandlerDataForCardStyle';

const Bookmarkpage = () => {
  const navigate = useNavigate();

  const {
    isLatestPending,
    error,
    data: tweetData,
  } = useTweetBookmarkDataById();
  const {
    isLikePending,
    error: likeError,
    data: likeData,
  } = useLikeBookmarkDataById();

  const { isPending: isAllUserDataPending, data: allUsers } = useAllUserData();
  const { isPending: isMediaDataPending, data: mediaData } =
    useMediaBookmarkData();
  const { isPending: isLatestDataPending, data: latestData } =
    useLatestBookmarkDataById();
  const { handleLikeClick, handleRetweetClick, handleSaveClick } =
    useActionHandlers();
  const { retweetData, likesData, savesData } = actionhandlerCardStyle();

  const [data, setData] = useState(tweetData);

  const handleTweet = (e, dataToSet) => {
    e.preventDefault();
    setData(dataToSet);
  };
  useEffect(() => {
    isLatestPending ? 'loading' : setData(tweetData);
  }, [tweetData, likeData, isLatestPending]);

 // console.log('tweetData', tweetData);
  //console.log('like==>', likeData);
  //console.log('MediaData=>`', mediaData);
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
            onClickTweet={(e) => handleTweet(e, tweetData)}
            onHandleLike={(e) => handleTweet(e, likeData)}
            onClickTweetWithMedia={(e) => handleTweet(e, mediaData)}
            onClickTweetWithComment={(e) => handleTweet(e, latestData)}
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
                return (
                  <Card
                    onHandleLike={(e, id) => handleLikeClick(e, item?.id)}
                    onHandleRetweet={(e, id) => handleRetweetClick(e, item?.id)}
                    onHandleSave={(e, id) => handleSaveClick(e, item?.id)}
                    key={`like-${item.createdAt}`}
                    {...item}
                    author={
                      allUsers &&
                      allUsers.find((user) => user?.id === item?.authorid)
                    }
                    retweetState={retweetData?.find(
                      (retweet) => retweet?.tweetId === item?.id
                    )}
                    savedState={savesData?.find(
                      (saved) => saved?.tweetId === item?.id
                    )}
                    likeState={likesData?.find(
                      (like) => like?.tweetId === item?.id
                    )}
                  />
                );
              })}
          </div>
        </div>
      </main>
    </Container>
  );
};

export default Bookmarkpage;
