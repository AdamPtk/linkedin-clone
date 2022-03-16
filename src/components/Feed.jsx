import React from 'react';
import './Feed.scss';
import { Avatar } from '@mui/material';
import PhotoIcon from '@mui/icons-material/Photo';
import YouTubeIcon from '@mui/icons-material/YouTube';
import EventIcon from '@mui/icons-material/Event';
import ArticleIcon from '@mui/icons-material/Article';
import InputOption from './InputOption';

function Feed() {
  return (
    <main className="feed">
      <div className="feed_inputContainer">
        <div className="feed_input">
          <Avatar />
          <div className="feed_startPost">Start a post</div>
        </div>
        <div className="feed_inputOptions">
          <InputOption Icon={PhotoIcon} title="Photo" color="#70b5f9" />
          <InputOption Icon={YouTubeIcon} title="Video" color="#7fc15e" />
          <InputOption Icon={EventIcon} title="Event" color="#e7a33e" />
          <InputOption Icon={ArticleIcon} title="Article" color="#fc9295" />
        </div>
      </div>
    </main>
  );
}

export default Feed;
