import { Link } from 'react-router-dom';

const SideNav = ({
  onClickTweet,
  onClickTweetWithComment,
  onClickTweetWithMedia,
  onHandleLike,
}) => {
  return (
    <aside>
      <nav className='sidenav shadow font-poppins'>
        <ul
          className='flex flex-column color-mid-gray bold-6'
          style={{ fontSize: '14px' }}>
          <li>
            <div className='active-link-indicator'></div>
            <Link onClick={onClickTweet}>Tweets</Link>
          </li>
          <li>
            <Link onClick={onClickTweetWithComment}>Tweets & replies</Link>
          </li>
          <li>
            <Link onClick={onClickTweetWithMedia}>Media</Link>
          </li>
          <li>
            <Link onClick={onHandleLike}>Likes</Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default SideNav;
