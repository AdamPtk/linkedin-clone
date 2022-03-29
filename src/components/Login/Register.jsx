import React, { useState } from 'react';
import './Register.scss';
import { Link, useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useDispatch } from 'react-redux';
import { updateProfile } from 'firebase/auth';
import { auth, storage } from '../../firebase/firebase';
import { login } from '../../features/userSlice';
import linkedin from '../../assets/linkedin-logo.png';
import UploadImgButton from '../atoms/UploadImgButton';

function Register() {
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [image, setImage] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleUpload = (userAuth) => {
    const uploadTask = storage.ref(`avatars/${image.name}`).put(image);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      },
      (err) => {
        alert(err.message);
      },
      () => {
        storage
          .ref('avatars')
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            updateProfile(userAuth, {
              displayName: name,
              photoURL: url,
            }).then(() => {
              dispatch(
                login({
                  email: userAuth.email,
                  uid: userAuth.uid,
                  displayName: userAuth.displayName,
                  photoURL: userAuth.photoURL,
                }),
              );
            });
          });
        navigate('/feed');
      },
    );
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (name === '') {
      setNameError(true);
    }
    if (email === '') {
      setEmailError(true);
    }
    if (password === '') {
      setPasswordError(true);
      return;
    }
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userAuth) => {
        if (image) {
          handleUpload(userAuth.user);
        } else {
          userAuth.user
            .updateProfile({
              displayName: name,
            })
            .then(() => {
              dispatch(
                login({
                  email: userAuth.user.email,
                  uid: userAuth.user.uid,
                  displayName: userAuth.user.displayName,
                }),
              );
            });
        }
      })
      .catch((err) => alert(err));
  };

  return (
    <div className="register">
      <img src={linkedin} alt="" />
      <form>
        <TextField
          className="register_input"
          label="Full Name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          error={nameError && !name}
          helperText={nameError && !name && 'Cannot be empty'}
        />
        <TextField
          className="register_input"
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          error={emailError && !email}
          helperText={emailError && !email && 'Cannot be empty'}
        />
        <TextField
          className="register_input"
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          error={passwordError && !password}
          helperText={passwordError && !password && 'Cannot be empty'}
        />
        <p className="register_helper">Add profile photo (optional)</p>
        <UploadImgButton
          className="register_input"
          image={image}
          setImage={setImage}
        />
        <p className="register_helper">You can also do it later</p>
        <Button
          type="submit"
          onClick={(e) => handleRegister(e)}
          variant="contained"
        >
          Join
        </Button>
      </form>
      <p className="register_footer">
        Already have an account?&nbsp;
        <Link to="/" className="register_login">
          Sign In
        </Link>
      </p>
    </div>
  );
}

export default Register;
