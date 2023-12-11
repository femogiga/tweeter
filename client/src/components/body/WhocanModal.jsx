import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import GroupIcon from '@mui/icons-material/Group';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import PublicIcon from '@mui/icons-material/Public';
import '../body/home.css';
const style = {
  position: 'absolute',
  top: '10%',

  right: '10%',

  //   transform: 'translate(-50%, -50%)',
  width: 234,
  bgcolor: 'background.paper',
  //   border: '2px solid #000',
  boxShadow: 24,
  p: 1,
  borderRadius: '8px',
};

const WhocanModal = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className='login-modal'>
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'>
        <Box sx={style}>
          <div className='flow-1'>
            <div style={{fontSize:'12px',marginBlockEnd:'.75rem',paddingInline:'.5rem'}}>
              <p>Who can reply?</p>
              <p>Choose who can reply to this tweet</p>
            </div>
            <div>
              <Button
                sx={{
                  color: '#4F4F4F',
                  fontSize: '12px',
                  textTransform: 'capitalize',
                  width: '164px',
                  justifyContent: 'flex-start',
                }}
                startIcon={<PublicIcon />}>
                Everyone
              </Button>
            </div>
            <div>
              <Button
                sx={{
                  color: '#4F4F4F',
                  fontSize: '12px',
                  textTransform: 'capitalize',
                  width: '164px',
                  justifyContent: 'flex-start',
                }}
                startIcon={<GroupIcon />}>
                People you follow
              </Button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default WhocanModal;
