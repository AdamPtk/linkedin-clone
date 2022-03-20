import React, { forwardRef } from 'react';
import './Post.scss';
import PropTypes from 'prop-types';
import { Avatar } from '@mui/material';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ChatIcon from '@mui/icons-material/Chat';
import ShareIcon from '@mui/icons-material/Share';
import SendIcon from '@mui/icons-material/Send';
import InputOption from '../atoms/IconButton';

const Post = forwardRef(({ name, description, message, photoURL }, ref) => (
  <div ref={ref} className="post">
    <div className="post_header">
      <Avatar src={photoURL} alt="">
        {name[0]}
      </Avatar>
      <div className="post_info">
        <h2>{name}</h2>
        <p>{description}</p>
      </div>
    </div>
    <div className="post_body">
      <p>{message}</p>
    </div>
    <div className="post_buttons">
      <InputOption Icon={ThumbUpOffAltIcon} title="Like" />
      <InputOption Icon={ChatIcon} title="Comment" />
      <InputOption Icon={ShareIcon} title="Share" />
      <InputOption Icon={SendIcon} title="Send" />
    </div>
  </div>
));

Post.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  photoURL: PropTypes.string,
};

Post.defaultProps = {
  photoURL: '',
};

export default Post;
