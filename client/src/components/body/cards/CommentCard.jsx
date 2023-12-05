import Avatar from './Avatar';
import FullDate from './FullDate';
import Fullname from './Fullname';

const CommentCard = () => {
  return (
    <div className=' comment-card flow-1'>
      <div className='flex'>
        <Avatar />
        <div
          style={{
            padding: '.4rem 5rem .4rem .4rem',
            backgroundColor: '#FAFAFA',
            borderRadius: '8px',
          }}>
          <div className='flex align-items--center'>
            <Fullname />
            <FullDate />
          </div>
          <p>
            I have seen awe-inspiring things that i thought would never be able
            to explain to another person
          </p>
        </div>
      </div>
    </div>
  );
};

export default CommentCard;
