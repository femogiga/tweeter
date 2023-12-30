
import { useEffect, useState } from 'react';
import Main from '../body/Main';
import Header from '../header/Header';
import PageImage from '../header/PageImage';
import Container from './Container';
import FollowingModal from './FollowingModal';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const navigate = useNavigate()




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
