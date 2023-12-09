import Main from '../body/Main';
import Header from '../header/Header';
import PageImage from '../header/PageImage';
import Container from './Container';

const ProfilePage = () => {
  return (
    <Container>
      <div className='profile-wrapper'>
        <Header />
        <PageImage />
        <Main />
      </div>
    </Container>
  );
};

export default ProfilePage;
