import Avatar from './cards/Avatar';
import PublicIcon from '@mui/icons-material/Public';
import InsertPhotoOutlinedIcon from '@mui/icons-material/InsertPhotoOutlined';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setWhocanModalVisibility } from '../../features/modalSlice';

const TweetInput = () => {
  const dispatch = useDispatch()
  // const whoCanModalVisible = useSelector(
  //   (state) => state.modal.whoCanReplyModalVisible
  // );


  const handleModalOpen = (e) => {
    e.preventDefault()
    dispatch(setWhocanModalVisibility('show'))
  }
  return (
    <div
      className='tweet-input flow-2'
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

        <div className='insert-photo' >
          <input type='file' />
          <InsertPhotoOutlinedIcon />
          <Link className='who-can'>
            <PublicIcon  />
          </Link>
          <Link className='who-can-text' onClick={handleModalOpen}>Everyone can reply</Link>
          <Button variant='contained'>Tweet</Button>
        </div>
      </form>
    </div>
  );
};

export default TweetInput;
