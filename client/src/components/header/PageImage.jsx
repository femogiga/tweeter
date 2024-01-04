import Button from '@mui/material/Button';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { useDispatch } from 'react-redux';
import { setFollowingModalVisibility } from '../../features/ModalSlice';
import { useUserData } from '../../api/userData';
const PageImage = () => {
  // button follower activates the followingModal with handleFollowingModal
  const dispatch = useDispatch();
  const handleFollowingModalVisibility = (e) => {
    e.preventDefault();
    dispatch(setFollowingModalVisibility('show'));
  };
  const parsedUser = JSON.parse(localStorage.getItem('userData'));

  //fetches user data
  const { isPending, error, data } = useUserData(parsedUser.id);
  const fullName = `${data?.firstName} ${data?.lastName}`;
  return (
    <div className='page-image '>
      <img
        src={
          data?.profileImageBackground ||
          'https://images.pexels.com/photos/746386/pexels-photo-746386.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
        }
        style={{ width: '100%' }}
      />
      <article className='profile flex space-between'>
        <div className='flex'>
          <div className='profile-photo'>
            <img
              src={
                data?.photo ||
                'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
              }
            />
          </div>
          <div className='profile__text flex flex-column'>
            <div className='flex align-items--center '>
              <p className='font-xl bold-6 color-dark-grey'>{fullName}</p>
              <p className=''>
                <span className='bold-6'>2569</span>
                <span className='font-sm color-mid-gray'> Following</span>
              </p>
              <p>
                <span className='bold-6'>10.8K</span>
                <span className='font-sm color-mid-gray'> Followers</span>
              </p>
            </div>
            <p style={{ fontSize: '18px' }}>
              {data?.profile ||
                'Photograpgher & Filmmaker based in Copenhagen Denmark'}
            </p>
          </div>
        </div>
        <div className='follow'>
          <Button
            onClick={handleFollowingModalVisibility}
            variant='contained'
            startIcon={<PersonAddIcon />}>
            Follower
          </Button>
        </div>
      </article>
    </div>
  );
};

export default PageImage;
