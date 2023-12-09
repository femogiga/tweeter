import { Link } from 'react-router-dom';

const ExploreNav = () => {
  return (
    <nav className='sidenav shadow'>
      <ul
        className='flex flex-column color-mid-gray bold-6'
        style={{ fontSize: '14px' }}>
        <li>
          <Link>Top</Link>
        </li>
        <li>
          <Link>Latest</Link>
        </li>
        <li>
          <Link>People</Link>
        </li>
        <li>
          <Link>Media</Link>
        </li>
      </ul>
    </nav>
  );
};

export default ExploreNav;
