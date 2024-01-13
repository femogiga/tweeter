import { Link } from 'react-router-dom';

const ExploreNav = ({
  onHandleTop,
  onHandleLatest,
  onHandleTopPeople,
  onHandleTopMedia,
}) => {
  return (
    <nav className='sidenav shadow'>
      <ul
        className='flex flex-column color-mid-gray bold-6'
        style={{ fontSize: '14px' }}>
        <li>
          <Link onClick={onHandleTop}>Top</Link>
        </li>
        <li>
          <Link onClick={onHandleLatest}>Latest</Link>
        </li>
        <li>
          <Link onClick={onHandleTopPeople}>People</Link>
        </li>
        <li>
          <Link onClick={onHandleTopMedia}>Media</Link>
        </li>
      </ul>
    </nav>
  );
};

export default ExploreNav;
