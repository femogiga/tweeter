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
  const userData = JSON.parse(localStorage.getItem('userData'));
  const id = parseInt(userData?.id);
  const {
    isPending: isTweetDataPending,
    error: tweetError,
    data: tweetData,
  } = useTweetDataByAuthorId(id);
  const {
    isPending: isWithCommentPending,
    error: withCommentError,
    data: tweetWithCommentData,
  } = useTweetDataByAuthorIdWithComments(id);

  const {
    isPending: isTweetWithMediaPending,
    error: withMediaError,
    data: tweetWIthMediaData,
  } = useTweetDataByAuthorIdWithMedia(id);
  const { isPending: isAllUserDataPending, data: allUsers } = useAllUserData();
  const {isPending:isRetweetpending, data: retweetData } = useRetweetDataByAuthorId(id);
  console.log('tweetComment', tweetWithCommentData);
  console.log('tweet', tweetData);
  console.log('retweet===>', retweetData);

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
                // author={userFinder(allUsers, item?.authorid)}
                author={allUsers.find((user) => user.id == item?.authorid)}
                {...item}
                user={userFinder(allUsers, item?.authorid)}
                id={item?.id}
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
                  commentAuthorid={comment?.commentAuthorid}
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
