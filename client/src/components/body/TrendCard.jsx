import { Link, useParams } from 'react-router-dom';

const TrendCard = ({ trendText, numTweets, handleTrendClick }) => {
  //const{tags} = useParams()
  trendText = trendText.slice(1, trendText?.length);

  return (
    <li className='flow-1'>
      <Link
        to={`/home?tags=${trendText}`}
        onClick={handleTrendClick}
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
