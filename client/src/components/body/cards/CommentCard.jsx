import { Link } from 'react-router-dom';
import Avatar from './Avatar';
import FullDate from './FullDate';
import Fullname from './Fullname';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import LoopIcon from '@mui/icons-material/Loop';

const CommentCard = () => {
  return (
    <div className=' comment-card flow-1'>
      <div className='flex'>
        <Avatar />
        <div
          style={{
            padding: '.4rem 5rem .4rem .4rem',
            backgroundColor: '#FAFAFA',
                      borderRadius: '8px',
            color:'#4F4F4F'

          }}>
          <div className='flex align-items--center'>
            <Fullname />
            <FullDate />
          </div>
          <p>
            I have seen awe-inspiring things that i thought would never be able
            to explain to another person
          </p>
        </div>
      </div>
      <ul className='like flex' style={{paddingInline:'2rem'}}>
        <li>
          <Link className='actions__list__items flex align-items--center'>
            <FavoriteBorderIcon />
            Like
          </Link>
        </li>
        <li>
          <Link className='actions__list__items flex align-items--center'>
            12k Likes
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default CommentCard;
