import React, { useState } from 'react';
import './RegisterImgUpload.scss';
import { Button } from '@mui/material';
import { getAuth, updateProfile } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import UploadImgButton from '../atoms/UploadImgButton';
import { storage } from '../../firebase/firebase';
import { login } from '../../features/userSlice';
import linkedin from '../../assets/linkedin-logo.png';

function RegisterImgUpload() {
  const [image, setImage] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = getAuth();

  const handleUpload = () => {
    const uploadTask = storage.ref(`avatars/${image.name}`).put(image);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
        );
        setUploadProgress(progress);
        console.log(uploadProgress);
      },
      (err) => {
        console.log(err);
        alert(err.message);
      },
      () => {
        storage
          .ref('avatars')
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            console.log(url);
            updateProfile(auth.currentUser, {
              photoURL: url,
            }).then(() => {
              dispatch(
                login({
                  ...auth.currentUser,
                  photoURL: auth.currentUser.photoURL,
                }),
              );
            });
          });
        navigate('/feed');
      },
    );
  };
  return (
    <div className="registerImgUpload">
      <img src={linkedin} alt="" />
      <p>Add profile photo (optional)</p>
      <UploadImgButton
        className="register_input"
        image={image}
        setImage={setImage}
      />
      <p>You can also do it later</p>
      <Button onClick={handleUpload}>Next</Button>
    </div>
  );
}

export default RegisterImgUpload;
