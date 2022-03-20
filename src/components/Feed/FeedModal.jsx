import React, { useState } from 'react';
import './FeedModal.scss';
import PropTypes from 'prop-types';
import { Avatar, Modal } from '@mui/material';
import { Box } from '@mui/system';
import CloseIcon from '@mui/icons-material/Close';
import PhotoIcon from '@mui/icons-material/Photo';
import YouTubeIcon from '@mui/icons-material/YouTube';
import TopicIcon from '@mui/icons-material/Topic';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import CelebrationIcon from '@mui/icons-material/Celebration';
import PollIcon from '@mui/icons-material/Poll';
import firebase from 'firebase/compat/app';
import { useSelector } from 'react-redux';
import { db } from '../../firebase/firebase';
import InputOption from '../atoms/IconButton';
import { selectUser } from '../../features/userSlice';

function FeedModal({ openModal, setOpenModal }) {
  const [message, setMessage] = useState('');
  const user = useSelector(selectUser);

  const submitPost = (e) => {
    e.preventDefault();

    db.collection('posts').add({
      name: user.displayName,
      description: user.email,
      message,
      photoURL: user.photoURL,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    setMessage('');
    setOpenModal(false);
  };

  return (
    <Modal
      open={openModal}
      onClose={() => setOpenModal(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className="feedModal">
        <div className="feedModal_header">
          <h2>Create a post</h2>
          <CloseIcon
            className="feedModal_header_close"
            onClick={() => setOpenModal(false)}
          />
        </div>
        <div className="feedModal_info">
          <Avatar src={user.photoURL} alt="">
            {user.displayName ? user.displayName[0] : null}
          </Avatar>
          <h4>{user.displayName && user.displayName}</h4>
        </div>
        <form>
          <div className="feedModal_message">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="What do you want to talk about?"
              rows="10"
              required
            />
          </div>
          <div className="feedModal_footer">
            <div className="feedModal_footer_left">
              <InputOption Icon={PhotoIcon} />
              <InputOption Icon={YouTubeIcon} />
              <InputOption Icon={TopicIcon} />
              <InputOption Icon={BusinessCenterIcon} />
              <InputOption Icon={CelebrationIcon} />
              <InputOption Icon={PollIcon} />
            </div>
            <div className="feedModal_footer_right">
              <button onClick={(e) => submitPost(e)} type="submit">
                Post
              </button>
            </div>
          </div>
        </form>
      </Box>
    </Modal>
  );
}

FeedModal.propTypes = {
  openModal: PropTypes.bool.isRequired,
  setOpenModal: PropTypes.func.isRequired,
};

export default FeedModal;
