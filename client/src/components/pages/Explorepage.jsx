import Header from '../header/Header';
import Container from './Container';
import '../body/explore.css';
import SearchIcon from '@mui/icons-material/Search';
import { Link, useNavigate } from 'react-router-dom';
import ExploreNav from './../body/ExploreNav';
import { Button } from '@mui/material';
import Card from '../body/cards/Card';
import { useEffect, useState } from 'react';
import { useLatestExploreData, useTopExploreData } from '../../api/exploreData';
import { useAllUserData } from '../../api/userData';

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

  const { isPending: isAllUserDataPending, data: allUsers } = useAllUserData();

  const { isPending: isTopDataPending, error, data: topData } = useTopExploreData();
   const {
     isPending: isLatestDataPending,
     error:latestError,
     data: latestData,
  } = useLatestExploreData();


  const [data, setData] = useState(topData);

  const handleTweet = (e, dataToSet) => {
    e.preventDefault();
    setData(dataToSet);
    return
  };
  useEffect(() => {
    isTopDataPending ? 'loading' : setData(topData);

  }, [topData,isTopDataPending]);
  console.log('latestexploreData====>', latestData);
    console.log('topexploreData====>', topData);

  return (
    <Container>
      <Header />
      <main className='explore-container'>
        <aside className='explore-nav'>
          <ExploreNav
            onHandleTop={(e) => handleTweet(e, topData)}
            onHandleLatest={(e) => handleTweet(e, latestData)}
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
              data.map((item) => (
                <Card
                  key={item.id}
                  {...item}
                  author={
                    allUsers &&
                    allUsers.find((user) => user?.id === item?.authorid)
                  }
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
