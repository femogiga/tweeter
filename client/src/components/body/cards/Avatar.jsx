const Avatar = ({photo}) => {
  return (
    <div className='avatar'>
      <img
        src={photo || 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'}
        alt='person'
      />
    </div>
  );
};

export default Avatar;
