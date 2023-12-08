import Avatar from './cards/Avatar';
import PublicIcon from '@mui/icons-material/Public';
import InsertPhotoOutlinedIcon from '@mui/icons-material/InsertPhotoOutlined';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';

const TweetInput = () => {
  return (
    <div
      className='tweet-input flow-1'
      style={{ backgroundColor: 'lightblue' }}>
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
          <Button variant='contained'>Tweet</Button>
        </div>
      </form>
    </div>
  );
};

export default TweetInput;
