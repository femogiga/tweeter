import Main from '../body/Main';
import Header from '../header/Header';
import PageImage from '../header/PageImage';
import Container from './Container';

const MainPage = () => {
  return (
    <Container>
      <Header />
      <PageImage />
      <Main />
    </Container>
  );
};

export default MainPage;
