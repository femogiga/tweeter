import Button from '@mui/material/Button';
import Fullname from './Fullname';
import Avatar from './Avatar';
import { Box } from '@mui/material';
import PersonAdd from '@mui/icons-material/PersonAdd';
import { useEffect, useState } from 'react';
import { useFollowPerson } from '../../../api/cardActionsData';
import { useGetFollowByUserIdForButtonStatus } from '../../../api/actionData';
const ModalInnerCard = ({
  id,
  firstName,
  lastName,
  photo,
  followerCount,
  profile,
  buttonStatus,
}) => {
  const { mutateAsync, onSuccess } = useFollowPerson();
  const [buttonState, setButtonState] = useState('Follow');
  /*
   *
   */

  const { data } = useGetFollowByUserIdForButtonStatus(id);
  console.table(data);
  useEffect(() => {
    //console.log('buttonState', buttonState)
  }, [buttonState, mutateAsync]);
  async function handleFollowButton() {
    const data = { personId: id };
    try {
      const response = await mutateAsync(data);
      setButtonState(response?.message);
     // console.log('response=====>', response);
    } catch (err) {
      console.error(err);
    }
  }
  return (
    <div style={{ padding: '1rem', borderTop: '1px solid #E0E0E0' }}>
      <div className='flex space-between flow-1'>
        <div className='flex'>
          <Avatar photo={photo} />
          <div>
            <Fullname fullName={firstName + ' ' + lastName} />
            <p style={{ color: '#828282', fontSize: '.75rem' }}>
              {`${followerCount}  followers`}
            </p>
          </div>
        </div>
        <div className='modal__inner-button-cont'>
          <Button
            variant='contained'
            startIcon={<PersonAdd />}
            style={{ textTransform: 'capitalize' }}
            onClick={handleFollowButton}>
            {data?.buttonStatus}
          </Button>
        </div>
      </div>
      <p style={{ color: '#828282', fontSize: '.875rem' }}>
        {profile || 'Follow me on IG: @artstyy'}
      </p>
    </div>
  );
};

export default ModalInnerCard;
