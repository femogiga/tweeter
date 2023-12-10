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
const FollowingModal = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
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
    borderRadius:'8px'
    //
  };
  return (
    <div className='following-modal'>
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'>
        <Box sx={style}>
          <div className='flex space-between'>
            <p style={{ padding: '1rem' }}>Daniel Jensen is following</p>
            <IconButton aria-label='delete'>
              <CloseIcon />
            </IconButton>
          </div>
          <ModalInnerCard />
          <ModalInnerCard />
          <ModalInnerCard />
          <ModalInnerCard />
        </Box>
      </Modal>
    </div>
  );
};

export default FollowingModal;
