const Stats = ({ retweetCount, commentCount }) => {
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
        <span>{commentCount || '449'} </span> Comment
      </p>
      <p>
        <span>{retweetCount || '59K'} </span>
        Retweets
      </p>
      <p>
        <span>234 </span>
        Saved
      </p>
    </div>
  );
};

export default Stats;
