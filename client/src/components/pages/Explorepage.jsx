import Header from '../header/Header';
import Container from './Container';
import '../body/explore.css';
import SearchIcon from '@mui/icons-material/Search';
import { Link, useNavigate } from 'react-router-dom';
import ExploreNav from './../body/ExploreNav';
import { Button } from '@mui/material';
import Card from '../body/cards/Card';
import { useEffect, useState } from 'react';
import {
  useLatestExploreData,
  useTopExploreData,
  useTopMediaData,
  useTopPeopleData,
} from '../../api/exploreData';
import { useAllUserData } from '../../api/userData';
import { useStatByAuthorId } from '../../api/statData';
import useActionHandlers from '../../utils/actionHandlers';
import actionhandlerCardStyle from '../../utils/actionHandlerDataForCardStyle';
import Search from '../body/Search';
import { useSelector } from 'react-redux';

const Explorepage = () => {
  //const { isPending, error, data } = useCard()
  //console.log('cardDataCentral',data)
  const searchText = useSelector((state) => state.auth.searchText);

  const navigate = useNavigate();
  useEffect(() => {
    const userToken = localStorage.getItem('userData');
    // setToken(userToken);
    if (!userToken) {
      navigate('/login');
    }
  }, [navigate]);

  const { isPending: isAllUserDataPending, data: allUsers } = useAllUserData();

  const {
    isPending: isTopDataPending,
    error,
    data: topData,
  } = useTopExploreData();
  const {
    isPending: isLatestDataPending,
    error: latestError,
    data: latestData,
  } = useLatestExploreData();
  const { isPending: isTopPeoplePending, data: topPeopleData } =
    useTopPeopleData();
  const { isPending: isTopMediaPending, data: topMediaData } =
    useTopMediaData();

  const { handleLikeClick, handleRetweetClick, handleSaveClick } =
    useActionHandlers();

  const [data, setData] = useState(topData);

  const handleTweet = (e, dataToSet) => {
    e.preventDefault();
    setData(dataToSet);
    return;
  };
  useEffect(() => {
    isTopDataPending ? 'loading' : setData(topData);
  }, [topData, isTopDataPending]);
  //console.log('latestexploreData====>', latestData);
  // console.log('topexploreData====>', topData);
  const { retweetData, likesData, savesData } = actionhandlerCardStyle();
  return (
    <Container>
      <Header />
      <main className='explore-container'>
        <aside className='explore-nav'>
          <ExploreNav
            onHandleTop={(e) => handleTweet(e, topData)}
            onHandleLatest={(e) => handleTweet(e, latestData)}
            onHandleTopPeople={(e) => handleTweet(e, topPeopleData)}
            onHandleTopMedia={(e) => handleTweet(e, topMediaData)}
          />
        </aside>
        <div className='explore-content' style={{ marginBlockStart: '1rem' }}>
          {/* <form action='' className='search-form flow-1'>
            <SearchIcon />
            <input type='text' placeholder='Search' />
            <Button variant='contained'>Search</Button>
          </form> */}
          <div>
            <Search />
          </div>

          <div>
            {data &&
              data
                .filter((str) => str.content.toLowerCase().includes(searchText.toLowerCase()))
                .map((item) => (
                  <Card
                    onHandleLike={(e, id) => handleLikeClick(e, item?.id)}
                    onHandleRetweet={(e, id) => handleRetweetClick(e, item?.id)}
                    onHandleSave={(e, id) => handleSaveClick(e, item?.id)}
                    key={item.id}
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
                ))}
            {/* <Card /> */}
          </div>
        </div>
      </main>
    </Container>
  );
};

export default Explorepage;
