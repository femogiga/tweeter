import React from 'react';
import Container from './Container';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import logo from '../../assets/tweeter.svg'
import '../../index.css'

const LoginPage = () => {
  const inputStyle = {
    width: '20rem',
    height: '2rem',
    paddingInline: '.6rem',
  };
  return (
    <div className='loginpage'>
      <header style={{paddingBlock:'1rem'}}>
        <Link className='header__icon'>
          <img src={logo} alt='logo' />
        </Link>
      </header>

      <div
        className='forBg'
        style={{
          position: 'absolute',
          transform: 'translate(-50% , -50%)',
          top: '40%',
          left: '50%',
        }}>
        <div
          className='flex'
          style={{ columnGap: '3rem', justifyContent: 'space-between' }}>
          <article>
            <p style={{ fontSize: '3rem', fontWeight: 'bold' }}>Welcome back</p>
            <p>Connect it current events ,friends and have fun</p>
          </article>
          <form>
            <h2 style={{ fontSize: '2rem' }}>Sign in</h2>
            <div className='flow-1'>
              <p>Email Address</p>
              <input type='email' style={inputStyle} />
            </div>

            <div className='flow-2'>
              <p>Password</p>
              <input type='password' style={inputStyle} />
            </div>
            <div>
              <Button sx={{ textTransform: 'capitalize' }} variant='contained'>
                Sign In
              </Button>
            </div>
            <p>Register</p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
