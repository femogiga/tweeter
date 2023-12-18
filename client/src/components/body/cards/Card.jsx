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
const Card = () => {
  return (
    <article className='card shadow flow-2' >
      <div className='flow-1'>
        {/* <Retweeted /> */}
        <div className='card__person flex align-items--center flow-1'>
          <Avatar />
          <div className=''>
            <Fullname />
            <FullDate />
          </div>
        </div>
        <div className='tweets' style={{ color: '#4F4F4F' }}>
          <p className='flow-1'>
            Travelling - it leaves you speechless,then turns you into a
            storyteller
          </p>

          <TweetImage />
          <Stats />
          <Actions />
          <Comment />
        </div>
      </div>
      <div className='comment-card-cont'>
        <CommentCard />
        <CommentCard />
      </div>
    </article>
  );
};

export default Card;
