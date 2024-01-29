import { Link } from 'react-router-dom';

import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import LoopIcon from '@mui/icons-material/Loop';
const Actions = ({
  onCommentVisible,
  onHandleLike,
  onHandleRetweet,
  onHandleSave,
  retweetState,
}) => {
  const green = {
    color: '#27AE60',
  };

  const retweetStyle = retweetState !== undefined ? green : null;
  const retweetText = retweetState !== undefined ? 'Retweeted' : 'Retweet';
  return (
    <div className='actions flow-05'>
      <ul className='actions__list flex space-between'>
        <li>
          <Link
            onClick={onCommentVisible}
            className='actions__list__items flex align-items--center'>
            <ChatBubbleOutlineIcon />
            Comments
          </Link>
        </li>
        <li>
          <Link
            style={retweetState !== undefined ? retweetStyle : null}
            onClick={onHandleRetweet}
            className={`actions__list__items flex align-items--center`}>
            {/* {retweetState !== undefined ? <LoopIcon /> : null} */}
            <LoopIcon />
            {retweetText}
          </Link>
        </li>
        <li>
          <Link
            className='actions__list__items flex align-items--center'
            onClick={onHandleLike}>
            {<FavoriteBorderIcon />}
            Likes
          </Link>
        </li>
        <li>
          <Link
            onClick={onHandleSave}
            className='actions__list__items flex align-items--center'>
            <BookmarkBorderIcon />
            Saved
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Actions;
