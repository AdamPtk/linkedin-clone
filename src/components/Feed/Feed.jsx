import React, { useEffect, useState } from 'react';
import './Feed.scss';
import PhotoIcon from '@mui/icons-material/Photo';
import YouTubeIcon from '@mui/icons-material/YouTube';
import EventIcon from '@mui/icons-material/Event';
import ArticleIcon from '@mui/icons-material/Article';
import FlipMove from 'react-flip-move';
import IconButton from '../atoms/IconButton';
import { db } from '../../firebase/firebase';
import Post from './Post';
import FeedModal from './FeedModal';
import UserAvatar from '../atoms/UserAvatar';

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
      <FeedModal openModal={openModal} setOpenModal={setOpenModal} />
      <div className="feed_inputContainer">
        <div className="feed_input">
          <UserAvatar />
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
          <IconButton Icon={PhotoIcon} title="Photo" color="#70b5f9" />
          <IconButton Icon={YouTubeIcon} title="Video" color="#7fc15e" />
          <IconButton Icon={EventIcon} title="Event" color="#e7a33e" />
          <IconButton Icon={ArticleIcon} title="Article" color="#fc9295" />
        </div>
      </div>
      <FlipMove>
        {posts.map(
          ({
            id,
            data: { name, description, message, photoURL, timestamp },
          }) => (
            <Post
              key={id}
              postId={id}
              name={name}
              description={description}
              message={message}
              photoURL={photoURL}
              timestamp={timestamp}
            />
          ),
        )}
      </FlipMove>
    </main>
  );
}

export default Feed;
