import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Avatar from '../body/cards/Avatar';
import Fullname from '../body/cards/Fullname';
import ModalInnerCard from '../body/cards/ModalInnerCard';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';
import { setFollowingModalVisibility } from '../../features/ModalSlice';
import {
  useGetFollowBForModal,
  useGetFollowByUserIdForButtonStatus,
} from '../../api/actionData';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useQueries } from '@tanstack/react-query';
import { useAllUserData } from '../../api/userData';
const FollowingModal = () => {
  const followingModalVisible = useSelector(
    (state) => state.modal.followingModalVisible
  );
  const { id } = useParams();
   useEffect(() => {}, [id]);
  const { isPending, error, data } = useGetFollowBForModal(parseInt(id));
  const arr = useGetFollowByUserIdForButtonStatus();
  const disaptch = useDispatch();
  // const {
  //   isPending: isButtonStatusPending,
  //   refetch: refetchButtonStatus,
  //   data: buttonStatusData,
  // } = useGetFollowByUserIdForButtonStatus(id);
  const { isPending:isDataPending,data: userData } = useAllUserData();
  const myUsers = isDataPending? 'loading' : userData?.filter((user) => user?.id === parseInt(id));
  //console.log('useeeerr', myUsers);
  const userName = myUsers[0]?.firstName + ' ' + myUsers[0]?.lastName;

  const handleFollowingModalClose = () => {
    disaptch(setFollowingModalVisibility('hide'));
  };


  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: '600px',
    width: '50%',
    minWidth: '300px',
    backgroundColor: 'background.paper',
    //   border: '2px solid #000',
    boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.3)',
    borderRadius: '8px',
    overflow: 'scroll',
  };
  return (
    <div className='following-modal'>
      <Modal
        open={followingModalVisible}
        onClose={handleFollowingModalClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'>
        <Box sx={style}>
          <div className='flex space-between'>
            <p style={{ padding: '1rem' }}>{`${userName} is following`}</p>
            <IconButton aria-label='delete' onClick={handleFollowingModalClose}>
              <CloseIcon />
            </IconButton>
          </div>
          {data &&
            data.map((item) => <ModalInnerCard key={item.id} {...item} />)}

          {/* <ModalInnerCard />
          <ModalInnerCard />
          <ModalInnerCard /> */}
        </Box>
      </Modal>
    </div>
  );
};

export default FollowingModal;
