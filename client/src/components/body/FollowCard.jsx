import { Button } from '@mui/material';
import Avatar from './cards/Avatar';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import Fullname from './cards/Fullname';
import { useFollowPerson } from '../../api/cardActionsData';
import { useEffect, useState } from 'react';

const FollowCard = ({
  id,
  firstName,
  lastName,
  photo,
  profile,
  profileImageBackground,
  count
}) => {
  const fullName = firstName + ' ' + lastName;
  //console.log('====>ert', +' ' + lastName);//
  const { mutateAsync, isPending,onSuccess } = useFollowPerson();
  const[buttonState,setButtonState] = useState('Follow')
  /*
  *
  */

  useEffect(() => {
    //console.log('buttonState', buttonState)
   },[buttonState,mutateAsync])
   async function handleFollowButton() {
    const data = { personId: id };
    try {
      const response = await mutateAsync(data)
      setButtonState(response?.message)
      //console.log('response=====>',response)

    } catch (err) {
      console.error(err);
    }
  }

    //console.log('buttonState2', response);
//
  return (
    <article
      className='follow-card flow-1'
      style={{ borderTop: '1px solid #E0E0E0', paddingBlock: '1rem' }}>
      <div className='flex flow-1'>
        <Avatar photo={photo} id={id } />
        <div>
          <Fullname fullName={fullName} />
          <p className='font-sm' style={{ color: '#828282' }}>
            <span>{count} </span>
            follower
          </p>
        </div>

        <Button
          variant='contained'
          startIcon={<PersonAddIcon />}
          onClick={handleFollowButton}>
          Follow
        </Button>
      </div>
      <p className='flow-1' style={{ color: '#828282' }}>
        {profile || 'Photographer & Filmmaker based in Copenhagen,denmark'}
      </p>
      <div>
        <img
          style={{
            width: '100%',
            maxHeight: '4.8rem',
            objectFit: 'cover',
            borderRadius: '8px',
          }}
          src={
            profileImageBackground ||
            'https://images.pexels.com/photos/746386/pexels-photo-746386.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
          }
        />
      </div>
    </article>
  );
};

export default FollowCard;
