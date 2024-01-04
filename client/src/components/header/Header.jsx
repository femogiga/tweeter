import { Link } from 'react-router-dom';
import logo from '../../assets/tweeter.svg';
import '../header/header.css';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import LoginModal from '../body/LoginModal';
import { useDispatch } from 'react-redux';
import { setLoginModalState } from '../../features/headerSlice';
const Header = () => {
  const dispatch = useDispatch();

  const handleLoginModalOpen = () => {
    dispatch(setLoginModalState(true));
  };

  const user = localStorage.getItem('userData');
  const parsedUser = JSON.parse(user)
  const fullName = parsedUser?.firstName + ' ' + parsedUser?.lastName

  return (
    <header className='header flex space-between align-items--center flow-1'>
      <Link className='header__icon'>
        <img src={logo} alt='logo' />
      </Link>
      <nav className='header__nav'>
        <ul className='flex col-gap-3'>
          <li>
            <Link to={'/home'}>Home</Link>
          </li>
          <li>
            <Link to={'/explore'}>Explore</Link>
          </li>
          <li>
            <Link to={'/bookmarks'}>Bookmarks</Link>
          </li>
        </ul>
      </nav>
      <div onClick={handleLoginModalOpen}>
        <div className='flex align-items--center login'>
          <div className='avatar-cont flex'>
            <img src={parsedUser?.photo || 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'} />
          </div>
          <p>{fullName ||'Xanthe Neal'}</p>
          <ArrowDropDownIcon />
        </div>
      </div>

      <LoginModal />
    </header>
  );
};

export default Header;
