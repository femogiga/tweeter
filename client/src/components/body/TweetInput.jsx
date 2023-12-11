import Avatar from './cards/Avatar';
import PublicIcon from '@mui/icons-material/Public';
import InsertPhotoOutlinedIcon from '@mui/icons-material/InsertPhotoOutlined';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';

const TweetInput = () => {
  return (
    <div
      className='tweet-input flow-1'
      style={{ boxShadow: '0 2px 4px 0 rgba(0,0,0,0.2)' ,marginBlockStart:'1rem'}}>
      <p style={{ backgroundColor: 'white', paddingInline: '.5rem' }}>
        Tweet something
      </p>
      <Avatar />
      <form className='form'>
        <textarea
          placeholder='What"s happening?'
          name=''
          id=''
          cols=''
          rows=''
          style={{
            width: '100%',
            height: '9rem',
            border: 'none',

          }}></textarea>

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
