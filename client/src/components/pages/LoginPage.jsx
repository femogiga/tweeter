import React, { useEffect, useState } from 'react';
import Container from './Container';
import { Button } from '@mui/material';
import { Link, useNavigate, useParams } from 'react-router-dom';
import logo from '../../assets/tweeter.svg';
import '../../index.css';
import { useLoginMutation } from '../../api/auth';
import { useDispatch, useSelector } from 'react-redux';
import { setInput } from '../../features/authSlice';
import { setLoginModalState } from '../../features/headerSlice';

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [token, setToken] = useState(null);

  const { isLoading, isSuccess, error, mutate, responseData } =
    useLoginMutation();
  const email = useSelector((state) => state.auth.email);
  const password = useSelector((state) => state.auth.password);
  useEffect(() => {
    const user = localStorage.getItem('userData');
    const parsedUser = JSON.parse(user);
    const id = parsedUser?.id;
    if (isSuccess) {
     // navigate(`/profile/${id}`);
     navigate(`/home`);

      window.location.reload();
    }
  }, [isSuccess, navigate]);

  const handleInputChange = (e) => {
    dispatch(
      setInput({
        fieldName: e.target.getAttribute('name'),
        value: e.target.value,
      })
    );
  };

  const handleLogin = async () => {
    const data = { email, password };
    if (Object.keys(data) == null) {
      return;
    }
    mutate(data);
    dispatch(setLoginModalState(false));
    const user = await localStorage.getItem('userData');
    //const token = await localStorage.getItem('token');
    const isAuthenticated = user != null;
    if (!isAuthenticated) {
      return;
    }
  };

  //console.log('email', email);
  //console.log('password', password);
  const inputStyle = {
    width: '20rem',
    maxWidth: '20rem',
    minWidth: '10rem',
    height: '2rem',
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
              <input
                type='email'
                style={inputStyle}
                name='email'
                value={email}
                onChange={(e) => handleInputChange(e)}
              />
            </div>

            <div className='flow-2'>
              <p>Password</p>
              <input
                type='password'
                style={inputStyle}
                value={password}
                name='password'
                onChange={(e) => handleInputChange(e)}
              />
            </div>
            <div className='flow-1'>
              <Button
                sx={{ textTransform: 'capitalize' }}
                variant='contained'
                onClick={handleLogin}>
                Sign In
              </Button>
            </div>
            <Link to='register'>Register</Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
