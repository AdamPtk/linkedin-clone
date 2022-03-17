import React from 'react';
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
import InputOption from './InputOption';

function FeedModal({
  openModal,
  setOpenModal,
  posts,
  setPosts,
  name,
  photoUrl,
}) {
  console.log(setPosts, posts);

  const submitPost = (e) => {
    e.preventDefault();
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
          <Avatar src={photoUrl} alt="" />
          <h4>{name}</h4>
        </div>
        <form>
          <div className="feedModal_message">
            <textarea
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
  posts: PropTypes.instanceOf(Array).isRequired,
  setPosts: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  photoUrl: PropTypes.string,
};

FeedModal.defaultProps = {
  photoUrl: '',
};

export default FeedModal;
