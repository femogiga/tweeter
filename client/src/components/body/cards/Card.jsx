import Avatar from './Avatar';
import FullDate from './FullDate';
import Fullname from './Fullname';
import Retweeted from './Retweeted';
const Card = () => {
  return (
    <article className='card'>
      <div>
        <Retweeted />
        <div className='card__person flex align-items--center flow-1'>
          <Avatar />
          <div className=''>
            <Fullname />
            <FullDate />
          </div>
        </div>
        <div className='tweets' style={{ color: '#4F4F4F' }}>
          <p className='flow-1'>
            Travelling - it leaves you speechless,then turns you into a
            storyteller
          </p>
          <div className='tweet__image'>
            <img
              src='https://images.pexels.com/photos/18758625/pexels-photo-18758625/free-photo-of-aerial-view-of-mountains-and-lakes-in-the-valley.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load'
              alt=''
            />
          </div>
          <div
            className='stats flex justify-content--flexend'
            style={{ color: '#BDBDBD',fontSize:'12px' }}>
            <p>
              <span>449 </span> Comment
            </p>
            <p>
              <span>59K </span>
              Retweets
            </p>
            <p>
              <span>234 </span>
              Saved
            </p>
          </div>
        </div>
      </div>
    </article>
  );
};

export default Card;
