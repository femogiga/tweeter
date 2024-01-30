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
  savedState,
  likeState,
}) => {
  const green = {
    color: '#27AE60',
  };
  const blue = {
    color: '#2D9CDB',
  };

  const red = {
    color: '#EB5757',
  };

  /*
   * style and text sets the color and text of buttons when clicked
   */

  const retweetStyle = retweetState !== undefined ? green : null;
  const retweetText = retweetState !== undefined ? 'Retweeted' : 'Retweet';
  const savedStyle = savedState !== undefined ? blue : null;
  const saveText = savedState !== undefined ? 'Saved' : 'Save';
  const likeStyle = likeState !== undefined ? red : null;
  const likeText = likeState !== undefined ? 'Liked' : 'Like';

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
            // style={retweetState !== undefined ? retweetStyle : null}
            style={retweetStyle}
            onClick={onHandleRetweet}
            className={`actions__list__items flex align-items--center`}>
            {/* {retweetState !== undefined ? <LoopIcon /> : null} */}
            <LoopIcon />
            {retweetText}
          </Link>
        </li>
        <li>
          <Link
            style={likeStyle}
            className='actions__list__items flex align-items--center'
            onClick={onHandleLike}>
            {<FavoriteBorderIcon />}
            {likeText}
          </Link>
        </li>
        <li>
          <Link
            // style={savedState !== undefined ? savedStyle : null}
            style={savedStyle}
            onClick={onHandleSave}
            className='actions__list__items flex align-items--center'>
            <BookmarkBorderIcon />
            {saveText}
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Actions;
