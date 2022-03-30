import React, { useState } from 'react';
import './Login.scss';
import { Link, useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useDispatch } from 'react-redux';
import { auth } from '../../firebase/firebase';
import { login } from '../../features/userSlice';
import linkedin from '../../assets/linkedin-logo.png';

function Login() {
  const [password, setPassword] = useState('');
  const [passwordLabel, setPasswordLabel] = useState('Password');
  const [passwordError, setPasswordError] = useState(false);
  const [email, setEmail] = useState('');
  const [emailLabel, setEmailLabel] = useState('Email');
  const [emailError, setEmailError] = useState(false);
  const [noUser, setNoUser] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validateEmail = () => {
    const regex = /^\S+@\S+\.\S+$/;
    if (email === '') {
      setEmailError(true);
      setEmailLabel('Cannot be empty');
      return false;
    }
    if (!email.match(regex)) {
      setEmailError(true);
      setEmailLabel('Not valid email address');
      return false;
    }
    setEmailError(false);
    setEmailLabel('Email');
    return true;
  };

  const validatePassword = () => {
    const regex = /^.{6,}$/;
    if (password === '') {
      setPasswordError(true);
      setPasswordLabel('Cannot be empty');
      return false;
    }
    if (!password.match(regex)) {
      setPasswordError(true);
      setPasswordLabel('Min 6 characters');
      return false;
    }
    setPasswordError(false);
    setPasswordLabel('Password');
    return true;
  };

  const handleLogin = (e) => {
    e.preventDefault();
    validateEmail();
    validatePassword();

    if (validateEmail() && validatePassword()) {
      auth
        .signInWithEmailAndPassword(email, password)
        .then((userAuth) => {
          navigate('/feed');
          dispatch(
            login({
              email: userAuth.user.email,
              uid: userAuth.user.uid,
              displayName: userAuth.user.displayName,
              photoURL: userAuth.user.photoURL,
            }),
          );
        })
        .catch(() => setNoUser(true));
    }
  };

  return (
    <div className="login">
      <img src={linkedin} alt="" />
      <form>
        <TextField
          className="login_input"
          label={emailLabel}
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setEmailLabel('Email');
            setEmailError(false);
            setNoUser(false);
          }}
          required
          error={emailError}
        />
        <TextField
          className="login_input"
          label={passwordLabel}
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setPasswordLabel('Password');
            setPasswordError(false);
            setNoUser(false);
          }}
          required
          error={passwordError}
        />
        {noUser && (
          <p style={{ marginBottom: 10, color: 'red' }}>
            Incorrect username or password
          </p>
        )}
        <Button type="submit" onClick={handleLogin} variant="contained">
          Sign In
        </Button>
      </form>
      <p className="login_footer">
        Not a member?&nbsp;
        <Link to="/register" className="login_register">
          Register Now
        </Link>
      </p>
    </div>
  );
}

export default Login;
