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
import { useRetweetDataByAuthorId } from '../../api/retweetData';
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
  const { data: retweetData } = useRetweetDataByAuthorId(3);
  console.log('tweetComment', tweetWithCommentData);
  console.log('tweet', tweetData);
  console.log('rerttweet===>', retweetData);

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
          {data &&
            data.map((item) => (
              <Card
                key={item?.id}
                author={userFinder(allUsers, item?.authorid)}
                {...item}
                user={userFinder(allUsers, item?.authorid)}
              />
            ))}
          {/* to do -- fix rewteet */}
          {retweetData &&
            retweetData.map((comment) => (
              <>
                <Retweeted
                  firstName={comment?.firstName}
                  lastName={comment?.lastName}
                />
                <Card
                  key={comment?.id}
                  {...comment}
                  author={userFinder(allUsers, comment?.authorid)}
                  commentUser={userFinder(allUsers, comment?.commentAuthorid)}
                />
              </>
            ))}
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
