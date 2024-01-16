import { Link } from 'react-router-dom';

const TrendCard = ({ trendText, numTweets, onHandleTrendClick }) => {
  trendText = trendText.slice(1, trendText.length);
  return (
    <li className='flow-1'>
      <Link
        to={`/home/${trendText}`}
        onClick={() => {
          window.location.href = `/home/${trendText}`;
        }}
        //onClick = {onHandleTrendClick}
        style={{ color: '#333333', fontWeight: 'bold' }}>
        {`#${trendText}`}
      </Link>
      <p className='font-sm' style={{ color: '#828282' }}>
        <span>{numTweets} </span> Tweets
      </p>
    </li>
  );
};

export default TrendCard;
