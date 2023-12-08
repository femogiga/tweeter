import { Link } from "react-router-dom";

const TrendCard = ({trendText,numTweets}) => {
  return (
    <li className="flow-1">
          <Link>#{trendText }</Link>
      <p>
        <span>{numTweets} </span> Tweets
      </p>
    </li>
  );
}

export default TrendCard
