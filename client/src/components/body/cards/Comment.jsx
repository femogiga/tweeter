import Avatar from './Avatar';
import InsertPhotoOutlinedIcon from '@mui/icons-material/InsertPhotoOutlined';

const Comment = () => {
  return (
    <div className='comment flex'>
      <Avatar
        photo={
          'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
        }
      />
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
