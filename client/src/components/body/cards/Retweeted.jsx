import LoopIcon from '@mui/icons-material/Loop';

const Retweeted = ({firstName,lastName }) => {
  const fullName = firstName  + ' ' + lastName
  return (
    <p
      className='retweeted flex align-items--center'
      style={{ color: '#828282' }}>
      <LoopIcon sx={{ fontSize: '1rem' }} />
      <span style={{ fontSize: '14px' }}>{ ` ${fullName} retweeted`}</span>
    </p>
  );
};

export default Retweeted;
