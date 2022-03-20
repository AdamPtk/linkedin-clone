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
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

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
      .catch((err) => alert(err));
  };

  return (
    <div className="login">
      <img src={linkedin} alt="" />
      <form>
        <TextField
          className="login_input"
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <TextField
          className="login_input"
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button type="submit" onClick={handleLogin} variant="contained">
          Sign In
        </Button>
      </form>
      <p>
        Not a member?&nbsp;
        <Link to="/register" className="login_register">
          Register Now
        </Link>
      </p>
    </div>
  );
}

export default Login;
