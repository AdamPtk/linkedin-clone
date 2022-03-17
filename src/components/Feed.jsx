import React, { useEffect, useState } from 'react';
import './Feed.scss';
import { Avatar } from '@mui/material';
import PhotoIcon from '@mui/icons-material/Photo';
import YouTubeIcon from '@mui/icons-material/YouTube';
import EventIcon from '@mui/icons-material/Event';
import ArticleIcon from '@mui/icons-material/Article';
import InputOption from './InputOption';
import { db } from '../firebase/firebase';
import Post from './Post';
import FeedModal from './FeedModal';

function Feed() {
  const [openModal, setOpenModal] = useState(false);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    db.collection('posts')
      .orderBy('timestamp', 'desc')
      .onSnapshot((snapshot) => {
        setPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          })),
        );
      });
  }, []);

  return (
    <main className="feed">
      <FeedModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        name="Adam Pietkiewicz"
        photoUrl="https://lh3.googleusercontent.com/a-/AOh14GjtE7W8lwvqhMbUEIVYupR08cY0TzFX3prMW84SOA=s96-c-rg-br100"
      />
      <div className="feed_inputContainer">
        <div className="feed_input">
          <Avatar />
          <button
            type="button"
            className="feed_startPost"
            onClick={() => setOpenModal(true)}
            onKeyUp={(e) => e.key === 'Enter' && setOpenModal(true)}
          >
            Start a post
          </button>
        </div>
        <div className="feed_inputOptions">
          <InputOption Icon={PhotoIcon} title="Photo" color="#70b5f9" />
          <InputOption Icon={YouTubeIcon} title="Video" color="#7fc15e" />
          <InputOption Icon={EventIcon} title="Event" color="#e7a33e" />
          <InputOption Icon={ArticleIcon} title="Article" color="#fc9295" />
        </div>
      </div>
      {posts.map(({ id, data: { name, description, message, photoUrl } }) => (
        <Post
          key={id}
          name={name}
          description={description}
          message={message}
          photoUrl={photoUrl}
        />
      ))}
    </main>
  );
}

export default Feed;
