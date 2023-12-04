import Avatar from './Avatar';
import InsertPhotoOutlinedIcon from '@mui/icons-material/InsertPhotoOutlined';

const Comment = () => {
  return (
    <div className='comment flex'>
      <Avatar />
      <div className='comment__input'>
        <input type='text' placeholder='Tweet your reply' />
        <button className='insert-photo'>
          <InsertPhotoOutlinedIcon />
          <input type='file' />
        </button>
      </div>
    </div>
  );
};

export default Comment;
