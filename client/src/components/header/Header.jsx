import { Link } from 'react-router-dom';
import logo from '../../assets/tweeter.svg';
import '../header/header.css';
const Header = () => {
  return (
    <header className='header flex space-between align-items--center flow-1'>
      <div className='header__icon'>
        <img src={logo} alt='logo' />
      </div>
      <nav className='header__nav'>
        <ul className='flex col-gap-3'>
          <li>
            <Link to={'/home' }>Home</Link>
          </li>
          <li>
            <Link>Explore</Link>
          </li>
          <li>
            <Link>Bookmarks</Link>
          </li>
        </ul>
      </nav>
      <Link>
        <div className='flex align-items--center login'>
          <div className='avatar-cont flex'>
            <img src='https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' />
          </div>
          <p>Xanthe Neal</p>
        </div>
      </Link>
    </header>
  );
};

export default Header;
