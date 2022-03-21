import React, { useState } from 'react';
import './HeaderAvatar.scss';
import { Avatar, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Popover from '@mui/material/Popover';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateProfile } from 'firebase/auth';
import { login, logout, selectUser } from '../../features/userSlice';
import { auth, storage } from '../../firebase/firebase';

function HeaderAvatar() {
  const [image, setImage] = useState('');
  const [popover, setPopover] = useState(null);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const open = Boolean(popover);
  const id = open ? 'headerAvatar_popover' : undefined;

  const handleClick = (event) => {
    setPopover(event.currentTarget);
  };

  const handleClose = () => {
    setPopover(null);
  };

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    auth.signOut();
    navigate('/');
  };

  const shortenImgName = (name) => {
    if (name.length > 12) {
      return `${name.slice(0, 10)}...`;
    }
    return name;
  };

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
              setImage('');
            });
          });
      },
    );
  };

  return (
    <>
      <div
        role="button"
        onClick={handleClick}
        onKeyDown={() => {}}
        tabIndex={0}
        className="headerAvatar"
      >
        <Avatar src={user.photoURL} className="headerAvatar_avatar">
          {user.displayName ? user.displayName[0] : null}
        </Avatar>
        <p className="headerAvatar_title">
          Me
          <ArrowDropDownIcon />
        </p>
      </div>
      <Popover
        id={id}
        open={open}
        anchorEl={popover}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <div className="headerAvatar_popover">
          <div className="headerAvatar_popover_header">
            <div className="headerAvatar_popover_header_wrapper">
              <div>
                <label htmlFor="uploadImgButton">
                  <input
                    onChange={handleChange}
                    accept="image/*"
                    id="uploadImgButton"
                    type="file"
                  />
                  <Avatar
                    src={user.photoURL}
                    className="headerAvatar_popover_header_avatar pointer"
                  >
                    <AddIcon />
                  </Avatar>
                </label>
              </div>
              <div className="headerAvatar_popover_header_profile">
                <h2>{user.displayName}</h2>
                <h4>{user.email}</h4>
              </div>
            </div>
            <p>{shortenImgName(image && image.name)}</p>
            <Button
              className="headerAvatar_popover_header_button"
              variant="outlined"
              onClick={() => handleUpload(auth.currentUser)}
              disabled={!image}
            >
              {`${user.photoURL ? 'Update' : 'Add'} profile photo`}
            </Button>
          </div>
          {/* <div
            role="button"
            className="headerAvatar_popover_option"
            // onClick={handleLogout}
            // onKeyDown={() => {}}
            // tabIndex={0}
          >
            Update profile photo
          </div> */}
          <div
            role="button"
            className="headerAvatar_popover_option"
            onClick={handleLogout}
            onKeyDown={() => {}}
            tabIndex={0}
          >
            Sign out
          </div>
        </div>
      </Popover>
    </>
  );
}

export default HeaderAvatar;
