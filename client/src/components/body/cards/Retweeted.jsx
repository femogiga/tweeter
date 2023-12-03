import LoopIcon from '@mui/icons-material/Loop';

const Retweeted = () => {
  return (
    <p
      className='retweeted flex align-items--center'
      style={{ color: '#828282' }}>
      <LoopIcon sx={{ fontSize: '1rem' }} />
      <span style={{ fontSize: '14px' }}>Daniel jensen Retweeted</span>
    </p>
  );
};

export default Retweeted;
