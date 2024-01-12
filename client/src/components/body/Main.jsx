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
import { useNavigate, useParams } from 'react-router-dom';
const Main = () => {
  const userData = JSON.parse(localStorage.getItem('userData'));
  //const id = parseInt(userData?.id);
  //const[id1,setId] = useState(userData?.id)
  const navigate = useNavigate();
  let { id } = useParams();
console.log('id: ' + id);
  useEffect(() => {

  }, [id, navigate]);
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
  const { isPending: isRetweetpending, data: retweetData } =useRetweetDataByAuthorId(id);

  console.log('tweetComment', tweetWithCommentData);
  //console.log('tweet', tweetData);
  //console.log('retweet===>', retweetData);

  //console.log('tweetWIthMediaData===>', tweetWIthMediaData);
  const [data, setData] = useState(tweetData);

  const handleTweet = async (e, dataToSet) => {
    e.preventDefault();
   await setData(dataToSet);
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
          {
            data && data.map((item) => {
              return(
              <Card
                key={item?.id}
                // author={userFinder(allUsers, item?.authorid)}
                author={allUsers && allUsers.find((user) => user?.id == item?.authorid)}
                {...item}
                user={allUsers && allUsers.find((user) => user?.id == item?.authorid)}
                id={item?.id}
              />);
            })}
          {/* to do -- fix rewteet */}
          {retweetData &&
            retweetData.map((retweet) => (
              <div key={`RetweetContainer-${retweet?.id}`}>
                <Retweeted
                  firstName={retweet?.firstName}
                  lastName={retweet?.lastName}
                />
                <Card
                  key={`Retweet-${retweet?.id}`}
                  {...retweet}
                  author={allUsers.find(
                    (user) => user?.id === retweet?.authorid
                  )}
                  commentUser={allUsers.find(
                    (user) => user?.id === retweet?.commentAuthorid
                  )}
                  commentAuthorid={retweet?.commentAuthorid}
                />
              </div>
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
