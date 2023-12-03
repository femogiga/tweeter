import { Link } from 'react-router-dom';

const SideNav = () => {
  return (
    <aside>
      <nav className='sidenav'>
        <ul className='flex flex-column'>
          <li>
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
