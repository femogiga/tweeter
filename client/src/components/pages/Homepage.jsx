import Header from '../header/Header';
import Container from './Container';
import '../header/header.css';
import '../body/home.css';
import Main from '../body/Main';
import Avatar from '../body/cards/Avatar';
import PublicIcon from '@mui/icons-material/Public';
import InsertPhotoOutlinedIcon from '@mui/icons-material/InsertPhotoOutlined';
import { Link } from 'react-router-dom';
import SideNav from '../body/SideNav';
import { Button } from '@mui/material';

const Homepage = () => {
  return (
    <Container>
      <Header />
      <div className='home-container'>
        <section className='home-content'>
          <div className='tweet-input' style={{ backgroundColor: 'lightblue' }}>
            <p>Tweet something</p>
            <Avatar />
            <form className='form'>
              <textarea
                placeholder='What"s happening?'
                name=''
                id=''
                cols=''
                rows=''
                style={{ width: '46.5rem', height: '9.7rem' }}></textarea>

              <div className='insert-photo'>
                <input type='file' />
                <InsertPhotoOutlinedIcon />
                <Link className='who-can'>
                  <PublicIcon />
                </Link>
                <p className='who-can-text'>Everyone can reply</p>
                <div className='post-comment-button'>
                  <Button variant='contained'>Tweet</Button>
                </div>
              </div>
            </form>
          </div>
        </section>
        <aside className='side-content'></aside>
      </div>
    </Container>
  );
};

export default Homepage;
