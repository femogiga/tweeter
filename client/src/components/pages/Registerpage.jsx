import React, { useEffect, useState } from 'react';
import Container from './Container';
import { Avatar, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/tweeter.svg';
import '../../index.css';
import '../body/register.css';
import { useRegisterMutation } from '../../api/auth';
import { useDispatch, useSelector } from 'react-redux';
import { setInput } from '../../features/authSlice';

const Registerpage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { mutate } = useRegisterMutation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [photo, setPhoto] = useState('');
  const [profile, setProfile] = useState('');

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setPhoto(e.target.files[0]);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'email') setEmail(value);
    else if (name === 'password') setPassword(value);
    else if (name === 'firstName') setFirstName(value);
    else if (name === 'lastName') setLastName(value);
    else if (name === 'profile') setProfile(value);
  };
  // useEffect(() => {
  //   console.log(profile)
  // }, [profile])

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('email', email);
      formData.append('password', password);
      formData.append('firstName', firstName);
      formData.append('lastName', lastName);
      formData.append('photo', photo);
      formData.append('profile', profile);

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
    <div className='loginpage'>
      <header style={{ paddingBlock: '1rem' }}>
        <Link className='header__icon'>
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
          <article>
            <p style={{ fontSize: '3rem', fontWeight: 'bold' }}>Welcome</p>
            <p>Connect it current events, friends and have fun</p>
          </article>
          <form onSubmit={handleRegister}>
            <h2 style={{ fontSize: '2rem' }}>Register</h2>
            <div className='flow-1'>
              <p>Email</p>
              <input
                type='email'
                style={inputStyle}
                name='email'
                value={email}
                onChange={handleInputChange}
              />
            </div>

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

            <div className='insert-photo flow-2 register-photo'>
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
                  src={photo}
                />
              </div>
            </div>

            <div className='flow-1'>
              <Button
                sx={{ textTransform: 'capitalize' }}
                variant='contained'
                type='submit'>
                Register
              </Button>
            </div>
            <Link to='/login'>Sign in</Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Registerpage;
