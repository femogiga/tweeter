const Stats = ({ retweetCount, commentCount, savedCount }) => {
  return (
    <div
      className='stats flex justify-content--flexend'
      style={{
        color: '#BDBDBD',
        fontSize: '12px',
        paddingBlock: '.4rem',
        paddingInlineEnd: '.4rem',
      }}>
      <p>
        <span>{commentCount || 0} </span> Comment
      </p>
      <p>
        <span>{retweetCount || 0} </span>
        Retweets
      </p>
      <p>
        <span>{savedCount || 0} </span>
        Saved
      </p>
    </div>
  );
};

export default Stats;
