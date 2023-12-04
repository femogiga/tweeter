import { Link } from 'react-router-dom';

import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import LoopIcon from '@mui/icons-material/Loop';
const Actions = () => {
  return (
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
            <LoopIcon />
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
  );
};

export default Actions;
