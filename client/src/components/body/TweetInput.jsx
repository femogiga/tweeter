import Avatar from './cards/Avatar';
import PublicIcon from '@mui/icons-material/Public';
import InsertPhotoOutlinedIcon from '@mui/icons-material/InsertPhotoOutlined';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setWhocanModalVisibility } from '../../features/modalSlice';
import { useCreateTweetMutation } from '../../api/postTweetData';
import { clearInputValue, setInputValue } from '../../features/tweetSlice';
import { useEffect, useState } from 'react';

const TweetInput = () => {
  const dispatch = useDispatch();
  const { isPending, isSuccess, error, mutate } = useCreateTweetMutation();
  // const whoCanModalVisible = useSelector(
  //   (state) => state.modal.whoCanReplyModalVisible
  const userData = localStorage.getItem('userData');
  const parsedUser = JSON.parse(userData);
  const userPhoto = parsedUser && parsedUser.photo;
  // );
  const [file, setFile] = useState(null);
  //const formData = new FormData();
  const content = useSelector((state) => state.tweet.content);
  const replyRestrictions = useSelector(
    (state) => state.tweet.replyRestrictions
  );
  console.log('file', file);
  //  const handleFile = (files) => {
  //    for (let i = 0; i < files.length; i++) {
  //      formData.append('files', files[i]);
  //    }
  //  };
  // const data = {
  //   content: content,
  //   replyRestrictions: replyRestrictions,
  //   image,
  // };

  useEffect(() => {}, [file]);
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('files', file);
      formData.append('content', content);
      formData.append('replyRestrictions', replyRestrictions);

      const response = await mutate(formData);
      console.log(response);

      dispatch(clearInputValue({ fieldname: 'content' }));
      dispatch(clearInputValue({ fieldname: 'replyRestrictions' }));
      setFile(null);
    } catch (error) {
      console.error(error);
    }
  }
  function handleFileInputChange(e) {
    if (e.target.files && e.target.files[0]) {
      //console.log(e.target.files);
      setFile(e.target.files[0]);
      // handleFile(e.target.files);
    }
  }

  const handleInputChange = (e) => {
    dispatch(
      setInputValue({ fieldname: e.target.name, value: e.target.value })
    );
  };

  const handleModalOpen = (e) => {
    e.preventDefault();
    dispatch(setWhocanModalVisibility('show'));
  };
  return (
    <div
      className='tweet-input flow-1'
      style={{
        boxShadow: '0 2px 4px 0 rgba(0,0,0,0.2)',
        marginBlockStart: '1rem',
      }}>
      <p style={{ backgroundColor: 'white', paddingInline: '.5rem' }}>
        Tweet something
      </p>
      <Avatar photo={userPhoto} id={parsedUser.id} />
      <form
        className='form'
        // encType='multipart/form-data'
        onSubmit={handleSubmit}>
        <textarea
          value={content}
          placeholder='What"s happening?'
          name='content'
          onChange={handleInputChange}
          id=''
          cols=''
          rows=''
          style={{
            width: '100%',
            height: '9rem',
            border: 'none',
          }}></textarea>

        <div className='insert-photo'>
          <input
            type='file'
            onChange={(e) => handleFileInputChange(e)}
            name='files'
            id='files'
          />
          <InsertPhotoOutlinedIcon />
          <Link className='who-can'>
            <PublicIcon />
          </Link>
          <Link className='who-can-text' onClick={handleModalOpen}>
            Everyone can reply
          </Link>
          <Button type='submit' variant='contained'>
            Tweet
          </Button>
        </div>
      </form>
    </div>
  );
};

export default TweetInput;
