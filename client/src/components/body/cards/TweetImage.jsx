const TweetImage = ({ imageUrl }) => {
  const style = { objectFit: 'cover' };
  return (
    <div className='tweet__image'>
      <img
        src={
          imageUrl ||
          'https://images.pexels.com/photos/18758625/pexels-photo-18758625/free-photo-of-aerial-view-of-mountains-and-lakes-in-the-valley.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load'
        }
        alt=''
        style={style}
      />
    </div>
  );
};

export default TweetImage;
