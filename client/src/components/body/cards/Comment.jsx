import { useEffect, useState } from 'react';
import Avatar from './Avatar';
import InsertPhotoOutlinedIcon from '@mui/icons-material/InsertPhotoOutlined';
import { useCreateCommentMutation } from '../../../api/postTweetData';
import { useDispatch, useSelector } from 'react-redux';
import { clearInputValue, setInputValue } from '../../../features/tweetSlice';

const Comment = ({ id }) => {
  const [replyImage, setReplyImage] = useState('');
  const parsedUser = JSON.parse(localStorage.getItem('userData'));
  const { isPending, isSuccess, mutate, error } = useCreateCommentMutation();
  const reply = useSelector((state) => state.tweet.reply);
  const dispatch = useDispatch();

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setReplyImage(e.target.files[0]);
      //console.log(replyImage);
    }
  };

  // const handleInputChange =  (e,fieldname) => {
  //    dispatch(setInputValue({ fieldname: fieldname, value: e.target.value }))
  //   console.log(reply)
  //  }

  function handleSubmit(e) {
    e.preventDefault();

    try {
      const formData = new FormData();
      const tweetId = id;
      formData.append('replyImage', replyImage);
      formData.append('reply', reply);
      formData.append('tweetId', tweetId);
      const response = mutate(formData);
      dispatch(clearInputValue({ fieldname: 'reply' }));
      setReplyImage(null);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
   // console.log('replyImage====>', replyImage);
  }, [replyImage]);
  return (
    <form className='comment flex' onSubmit={handleSubmit}>
      <Avatar
        photo={
          parsedUser?.photo ||
          'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
        }
        id={parsedUser.id}
      />
      <div className='comment__input'>
        <input
          type='text'
          placeholder='Tweet your reply'
          name='reply'
          value={reply}
          onChange={(e) => {
            dispatch(
              setInputValue({ fieldname: 'reply', value: e.target.value })
            );
            //console.log('reply====>', reply);
          }}
        />
        <button className='insert-photo'>
          <InsertPhotoOutlinedIcon />
          <input
            type='file'
            name='replyImage'
            id={'replyImage'}
            onChange={(e) => handleFileChange(e)}
          />
        </button>
      </div>
    </form>
  );
};

export default Comment;
