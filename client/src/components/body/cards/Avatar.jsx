import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Avatar = ({ photo, id }) => {
  const navigate = useNavigate()
  const handleAvatarClick =  () => {
    navigate(`/profile/${id}`)
    window.location.reload()
      window.scrollTo(0, 0);
  }


  return (
    // <Link to = {`/profile/${id}`}>

      <div className='avatar' onClick = {handleAvatarClick}>
        <img
          src={
            photo ||
            'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
          }
          alt='person'
        />
      </div>
    // </Link>
  );
};

export default Avatar;
