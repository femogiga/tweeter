import TrendCard from './TrendCard';

const Trends = () => {
  return (
    <div
      className='trend'
      style={{
        paddingInline: '1rem',
        paddingBlock: '1rem',
        height: '31rem',
        borderRadius: '12px',
        marginBlockEnd: '2rem',
        marginBlockStart:'1rem',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
      }}>
      <p className='flow-1'>Trends for you</p>
      <ul>
        <TrendCard trendText={'Programming'} numTweets={'120'} />
        <TrendCard trendText={'devchallenges'} numTweets={'122'} />
        <TrendCard trendText={'frontend'} numTweets={'400'} />
        <TrendCard trendText={'helsinki'} numTweets={'276'} />
        <TrendCard trendText={'100DaysOfCode'} numTweets={'290'} />
        <TrendCard trendText={'learntocode'} numTweets={'100'} />
      </ul>
    </div>
  );
};

export default Trends;
