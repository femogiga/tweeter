import { Link } from 'react-router-dom';
import Avatar from './Avatar';
import FullDate from './FullDate';
import Fullname from './Fullname';
import Retweeted from './Retweeted';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import CachedIcon from '@mui/icons-material/Cached';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import InsertPhotoOutlinedIcon from '@mui/icons-material/InsertPhotoOutlined';
const Card = () => {
  return (
    <article className='card shadow'>
      <div>
        <Retweeted />
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
          <div className='tweet__image'>
            <img
              src='https://images.pexels.com/photos/18758625/pexels-photo-18758625/free-photo-of-aerial-view-of-mountains-and-lakes-in-the-valley.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load'
              alt=''
            />
          </div>
          <div
            className='stats flex justify-content--flexend'
            style={{
              color: '#BDBDBD',
              fontSize: '12px',
              paddingBlock: '.4rem',
              paddingInlineEnd:'.4rem'
            }}>
            <p>
              <span>449 </span> Comment
            </p>
            <p>
              <span>59K </span>
              Retweets
            </p>
            <p>
              <span>234 </span>
              Saved
            </p>
          </div>
          <div className='actions flow-05'>
            <ul className='actions__list flex space-between'>
              <li>
                <Link className='actions__list__items flex align-items--center'>
                  <ChatBubbleOutlineIcon />
                  Comments
                </Link>
              </li>
              <li>
                <Link className='actions__list__items flex align-items--center'>
                  <CachedIcon />
                  Retweets
                </Link>
              </li>
              <li>
                <Link className='actions__list__items flex align-items--center'>
                  <FavoriteBorderIcon />
                  Likes
                </Link>
              </li>
              <li>
                <Link className='actions__list__items flex align-items--center'>
                  <BookmarkBorderIcon />
                  Saved
                </Link>
              </li>
            </ul>
          </div>
          <div className='comment flex'>
            <Avatar />
            <div className='comment__input'>
              <input type='text' placeholder='Tweet your reply' />
              <button className='insert-photo'>
                <InsertPhotoOutlinedIcon />
              <input type='file'/>
              </button>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default Card;
