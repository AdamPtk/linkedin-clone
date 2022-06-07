import React, { useState } from 'react';
import './FeedModal.scss';
import PropTypes from 'prop-types';
import { Button, Modal } from '@mui/material';
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
import { selectUser } from '../../features/userSlice';
import { db } from '../../firebase/firebase';
import useMobileDimensions from '../../modules/isMobile';
import IconButton from '../atoms/IconButton';
import UserAvatar from '../atoms/UserAvatar';

function FeedModal({
  openModal,
  setOpenModal,
  editModal,
  setEditModal,
  editState,
  setEditState,
  idToUpdate,
}) {
  const [message, setMessage] = useState('');
  const user = useSelector(selectUser);
  const isMobile = useMobileDimensions();

  const submitPost = (e) => {
    e.preventDefault();

    db.collection('posts').add({
      authorId: user.uid,
      name: user.displayName,
      description: user.email,
      message,
      photoURL: user.photoURL ? user.photoURL : null,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    setMessage('');
    setOpenModal(false);
  };

  const submitEdit = (e) => {
    e.preventDefault();

    db.collection('posts').doc(idToUpdate).update({
      message,
    });

    setMessage('');
    setOpenModal(false);
  };

  return (
    <Modal
      open={openModal}
      onClose={() => {
        setOpenModal(false);
        setEditModal(false);
        setEditState('');
      }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className="feedModal">
        <div className="feedModal_header">
          <h2>{editModal ? 'Edit post' : 'Create a post'}</h2>
          <CloseIcon
            className="feedModal_header_close"
            onClick={() => setOpenModal(false)}
          />
        </div>
        <div className="feedModal_info">
          <UserAvatar />
          <h4>{user.displayName && user.displayName}</h4>
        </div>
        <form>
          <div className="feedModal_message">
            <textarea
              value={message || editState}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="What do you want to talk about?"
              rows="10"
              required
            />
          </div>
          <div className="feedModal_footer">
            <div className="feedModal_footer_left">
              <IconButton Icon={PhotoIcon} disabled={editModal} />
              <IconButton Icon={YouTubeIcon} disabled={editModal} />
              <IconButton Icon={TopicIcon} disabled={editModal} />
              {!isMobile && (
                <IconButton Icon={BusinessCenterIcon} disabled={editModal} />
              )}
              {!isMobile && (
                <IconButton Icon={CelebrationIcon} disabled={editModal} />
              )}
              {!isMobile && <IconButton Icon={PollIcon} disabled={editModal} />}
            </div>
            <div className="feedModal_footer_right">
              <Button
                variant="contained"
                onClick={(e) => (editModal ? submitEdit(e) : submitPost(e))}
                type="submit"
                disabled={!message}
              >
                {editModal ? 'Save' : 'Post'}
              </Button>
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
  editModal: PropTypes.bool.isRequired,
  setEditModal: PropTypes.func.isRequired,
  editState: PropTypes.string.isRequired,
  setEditState: PropTypes.func.isRequired,
  idToUpdate: PropTypes.string.isRequired,
};

export default FeedModal;
