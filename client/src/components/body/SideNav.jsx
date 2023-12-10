import { Link } from 'react-router-dom';

const SideNav = () => {
  return (
    <aside>
      <nav className='sidenav shadow'>
        <ul
          className='flex flex-column color-mid-gray bold-6'
          style={{ fontSize: '14px' }}>
          <li>
            <div className='active-link-indicator'></div>
            <Link>Tweets</Link>
          </li>
          <li>
            <Link>Tweets & replies</Link>
          </li>
          <li>
            <Link>Media</Link>
          </li>
          <li>
            <Link>Likes</Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default SideNav;
