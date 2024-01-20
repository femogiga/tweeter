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
import { useDispatch, useSelector } from 'react-redux';
import { setWhocanModalVisibility } from '../../features/modalSlice';
import { setInputValue } from '../../features/tweetSlice';
const style = {
  position: 'absolute',
  top: '29%',

  left: '28%',

  //   transform: 'translate(-50%, -50%)',
  width: 234,
  bgcolor: 'background.paper',
  //   border: '2px solid #000',
  boxShadow: 24,
  p: 1,
  borderRadius: '8px',
};

const WhocanModal = () => {
  // const [open, setOpen] = React.useState(false);
  // const handleOpen = () => setOpen(true);
  // const handleClose = () => setOpen(false);
  const dispatch = useDispatch();

  const whoCanModalVisible = useSelector(
    (state) => state.modal.whoCanReplyModalVisible
  );

  const handleWhocanModalClose = () => {
    dispatch(setWhocanModalVisibility('hide'));
  };

  const replyRestrictions = useSelector((state) => state.replyRestrictions);

  return (
    <div className='login-modal'>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal
        open={whoCanModalVisible}
        onClose={handleWhocanModalClose}
        aria-labelledby='modal-modal-title'
        BackdropProps={{ invisible: true }}
        aria-describedby='modal-modal-description'>
        <Box sx={style}>
          <div className='flow-1'>
            <div
              style={{
                fontSize: '12px',
                marginBlockEnd: '.75rem',
                paddingInline: '.5rem',
              }}>
              <p>Who can reply?</p>
              <p>Choose who can reply to this tweet</p>
            </div>
            <div>
              <Button
                onClick={() =>
                  dispatch(
                    setInputValue({
                      fieldname: 'replyRestrictions',
                      value: 'Everyone',
                    })
                  )
                }
                sx={{
                  color: '#4F4F4F',
                  fontSize: '12px',
                  textTransform: 'capitalize',
                  width: '209px',
                  justifyContent: 'flex-start',
                }}
                startIcon={<PublicIcon />}>
                Everyone
              </Button>
            </div>
            <div>
              <Button
                onClick={() =>
                  dispatch(
                    setInputValue({
                      fieldname: 'replyRestrictions',
                      value: 'Followers',
                    })
                  )
                }
                sx={{
                  color: '#4F4F4F',
                  fontSize: '12px',
                  textTransform: 'capitalize',
                  width: '209px',
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
