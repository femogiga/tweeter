import React, { useEffect, useState } from 'react';
import Container from './Container';
import { Avatar, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/tweeter.svg';
import '../../index.css';
import '../body/register.css';
import { useUpdateMutation } from '../../api/auth';
import { useDispatch, useSelector } from 'react-redux';
import { setInput } from '../../features/authSlice';

const SettingsPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { mutate } = useUpdateMutation();
  const user = localStorage.getItem('userData');
  const parsedUser = JSON.parse(user);
  const id = parsedUser?.id;
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState(parsedUser?.firstName);
  const [lastName, setLastName] = useState(parsedUser?.lastName);
  const [photo, setPhoto] = useState(parsedUser?.photo);
  const [profile, setProfile] = useState(parsedUser?.profile);
  // const [id, setID] = useState(parsedUser?.profile);
  const [newPassword, setNewPassword] = useState('');
  const [profileImageBackground, setProfileImageBackground] = useState(
    parsedUser?.profileImageBackground
  );
  const [bgUrl, setBgUrl] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setPhoto(e.target.files[0]);
      setPhotoUrl(window.URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleProfileBgFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setProfileImageBackground(e.target.files[0]);
      setBgUrl(window.URL.createObjectURL(e.target.files[0]));
      //console.log('profileImageBackground', profileImageBackground);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'password') setPassword(value);
    else if (name === 'firstName') setFirstName(value);
    else if (name === 'lastName') setLastName(value);
    else if (name === 'profile') setProfile(value);
    else if (name === 'newPassword') setNewPassword(value);
  };
  useEffect(() => {
    //console.log(newPassword);
    //console.log(photo);
    //console.log(profileImageBackground);
  }, [profile, newPassword, profileImageBackground, photo]);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('password', password);
      formData.append('firstName', firstName);
      formData.append('lastName', lastName);
      formData.append('photo', photo);
      formData.append('profile', profile);
      formData.append('profileImageBackground', profileImageBackground);
      formData.append('id', parsedUser.id);

      await mutate(formData);
      // Optionally, handle success or redirect to another page
      //navigate('/login');
    } catch (err) {
      console.error(err);
    }
  };

  const inputStyle = {
    width: '20rem',
    maxWidth: '20rem',
    minWidth: '10rem',
    height: '2rem',
    paddingInline: '.6rem',
  };

  const textAreaStyle = {
    width: '100%',
    maxWidth: '20rem',
    minWidth: '10rem',
    height: '4rem',
    paddingInline: '.6rem',
  };

  return (
    <div className='loginpage settings'>
      <header style={{ paddingBlock: '1rem' }}>
        <Link to='/home' className='header__icon'>
          <img src={logo} alt='logo' />
        </Link>
      </header>

      <div
        className='forBg'
        style={{
          position: 'absolute',
          transform: 'translate(-50% , -50%)',
          top: '50%',
          left: '50%',
        }}>
        <div
          className='flex'
          style={{ columnGap: '3rem', justifyContent: 'space-between' }}>
          <form onSubmit={handleRegister}>
            <h2 style={{ fontSize: '2rem' }}>Update details</h2>

            <div className='flow-1'>
              <p>Password</p>
              <input
                type='password'
                style={inputStyle}
                value={password}
                name='password'
                onChange={handleInputChange}
              />
            </div>
            <div className='flow-1'>
              <p>New password</p>
              <input
                type='password'
                style={inputStyle}
                value={newPassword}
                name='newPassword'
                onChange={handleInputChange}
              />
            </div>

            <div className='flow-1'>
              <p>Firstname</p>
              <input
                type='text'
                style={inputStyle}
                name='firstName'
                value={firstName}
                onChange={handleInputChange}
              />
            </div>

            <div className='flow-1'>
              <p>Lastname</p>
              <input
                type='text'
                style={inputStyle}
                name='lastName'
                value={lastName}
                onChange={handleInputChange}
              />
            </div>
            <div className='flow-1'>
              <p>About me</p>
              <textarea
                name='profile'
                value={profile}
                onChange={handleInputChange}
                style={textAreaStyle}></textarea>
            </div>

            {/* <div className='insert-photo flow-2 register-photo'>
              <p>Photo</p>
              <input
                type='file'
                name='photo'
                id='photo'
                className='register-photo-input'
                onChange={handleFileChange}
              />
              <div className='avatar-cont'>
                <Avatar
                  variant='square'
                  sx={{ width: 175, height: 175 }}
                  alt='Remy Sharp'
                  src={photoUrl || photo}
                />
              </div>
            </div> */}

            <div className='insert-photo flow-2 register-photo'>
              <p>Profile background</p>
              <input
                type='file'
                name='profileImageBackground'
                id='profileImageBackground'
                className='register-photo-input'
                onChange={handleProfileBgFileChange}
              />
              <div className='avatar-cont'>
                <Avatar
                  variant='square'
                  sx={{ width: 175, height: 75 }}
                  alt='Remy Sharp'
                  src={bgUrl || profileImageBackground}
                />
              </div>
            </div>

            <div className='flow-1'>
              <Button
                sx={{ textTransform: 'capitalize' }}
                variant='contained'
                type='submit'>
                Update
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
