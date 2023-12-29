import { useEffect, useState } from 'react';
import { useTweetDataByAuthorId } from '../../api/tweetData';
import {
  useTweetDataByAuthorIdWithComments,
  useTweetDataByAuthorIdWithMedia,
} from '../../api/tweetWithCommentData';
import Card from './cards/Card';
import CardContainer from './cards/CardContainer';
import Retweeted from './cards/Retweeted';
import './main.css';
import SideNav from './SideNav';
import { useAllUserData } from '../../api/userData';
import { userFinder } from '../../utils/userFinder';
const Main = () => {
  const {
    isPending: isTweetDataPending,
    error: tweetError,
    data: tweetData,
  } = useTweetDataByAuthorId(3);
  const {
    isPending: isWithCommentPending,
    error: withCommentError,
    data: tweetWithCommentData,
  } = useTweetDataByAuthorIdWithComments(3);

  const {
    isPending: isTweetWithMediaPending,
    error: withMediaError,
    data: tweetWIthMediaData,
  } = useTweetDataByAuthorIdWithMedia(3);
  const { data: allUsers } = useAllUserData();
  console.log('tweetComment', tweetWithCommentData);
  console.log('tweet', tweetData);
  console.log('tweetWIthMediaData===>', tweetWIthMediaData);
  const [data, setData] = useState(tweetData);

  const handleTweet = (e, dataToSet) => {
    e.preventDefault();
    setData(dataToSet);
  };
  useEffect(() => {
    isTweetDataPending ? 'loading' : setData(tweetData);
  }, [tweetData]);

  console.log('data', data);
  return (
    <main className='main'>
      <div className='main__container'>
        <SideNav
          onClickTweet={(e) => handleTweet(e, tweetData)}
          onClickTweetWithComment={(e) => handleTweet(e, tweetWithCommentData)}
          onClickTweetWithMedia={(e) => handleTweet(e, tweetWIthMediaData)}
        />
        <div className='card-parent'>
          <Retweeted />
          {data && data.map((item) => <Card key={item?.id} {...item} user={userFinder(allUsers,item?.authorid)} />)}
          {/* <Card />
          <Card />
          <Card /> */}
        </div>
        {/* <CardContainer/> */}
      </div>
    </main>
  );
};

export default Main;
