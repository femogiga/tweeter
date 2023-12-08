import { Button } from '@mui/material';
import Avatar from './cards/Avatar';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import Fullname from './cards/Fullname';

const FollowCard = () => {
  return (
    <article className='follow-card flow-1'>
      <div className='flex flow-1'>
        <Avatar />
        <div>
          <Fullname />
          <p>
            <span>230k </span>
            follower
          </p>
        </div>

        <Button variant='contained' startIcon={<PersonAddIcon />}>
          Follow
        </Button>
      </div>
      <p className='flow-1'>Photographer & Filmmaker based in Copenhagen,denmark</p>
      <div>
        <img
          style={{
            width: '100%',
            maxHeight: '4.8rem',
            objectFit: 'cover',
          }}
          src='https://images.pexels.com/photos/746386/pexels-photo-746386.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
          alt=''
        />
      </div>
    </article>
  );
};

export default FollowCard;
