import Button from '@mui/material/Button';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
const PageImage = () => {
  return (
    <div className='page-image '>
      <img
        src='https://images.pexels.com/photos/746386/pexels-photo-746386.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
        style={{ width: '100%' }}
      />
      <article className='profile flex space-between'>
        <div className='flex'>
          <div className='profile-photo'>
            <img src='https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' />
          </div>
          <div className='profile__text flex flex-column'>
            <div className='flex align-items--center '>
              <p className='font-xl bold-6 color-dark-grey'>Daniel Jensen</p>
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
              Photograpgher & Filmmaker based in Copenhagen Denmark
            </p>
          </div>
        </div>
        <div className='follow'>
          <Button variant='contained' startIcon={<PersonAddIcon />}>
            Follower
          </Button>
        </div>
      </article>
    </div>
  );
};

export default PageImage;
