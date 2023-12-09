import { Link } from 'react-router-dom';

const TrendCard = ({ trendText, numTweets }) => {
  return (
    <li className='flow-1' >
      <Link style={{ color: '#333333' }}>#{trendText}</Link>
      <p className='font-sm' style={{ color: '#828282' }}>
        <span>{numTweets} </span> Tweets
      </p>
    </li>
  );
};

export default TrendCard;
