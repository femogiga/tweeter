
import Main from '../body/Main';
import Header from '../header/Header';
import PageImage from '../header/PageImage';
import Container from './Container';
import FollowingModal from './FollowingModal';

const ProfilePage = () => {

 
  return (
    <Container>
      <div className='profile-wrapper'>
        <Header />
        <PageImage />

        <Main />
        <FollowingModal />
      </div>
    </Container>
  );
};

export default ProfilePage;
