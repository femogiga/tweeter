import { Link } from 'react-router-dom';
import Avatar from './Avatar';
import FullDate from './FullDate';
import Fullname from './Fullname';
import Retweeted from './Retweeted';
import Actions from './Actions';
import Comment from './Comment';
import Stats from './Stats';
import TweetImage from './TweetImage';
import CommentCard from './CommentCard';
import { useAllUserData, useUserData } from '../../../api/userData';
import { userFinder } from './../../../utils/userFinder';
const Card = ({ content, imageUrl, comments,createdAt }) => {
  // console.log('comments', comments);
  //  const {
  //    isPending,
  //    error,
  //    data: userDataById,
  //  } = useUserData('commentAuthorid');////
  const { data:allUsers } = useAllUserData();
  console.log('allUsers===>', allUsers);
  return (
    <article className='card shadow flow-2'>
      <div className='flow-1'>
        {/* <Retweeted /> */}
        <div className='card__person flex align-items--center flow-1'>
          <Avatar />
          <div className=''>
            <Fullname />
            <FullDate createdAt={createdAt} />
          </div>
        </div>
        <div className='tweets' style={{ color: '#4F4F4F' }}>
          <p className='flow-1'>
            {content ||
              'Travelling - it leaves you speechless,then turns you into a storyteller'}
          </p>

          {imageUrl && <TweetImage imageUrl={imageUrl} />}
          <Stats />
          <Actions />
          <Comment />
        </div>
      </div>
      <div className='comment-card-cont'>
        {comments &&
          comments.map((comment) => (

            <CommentCard key={comment?.id} {...comment}  user = {userFinder(allUsers,comment?.commentAuthorid)} />
          ))}
        {/* <CommentCard /> */}
        {/* <CommentCard /> */}
      </div>
    </article>
  );
};

export default Card;
