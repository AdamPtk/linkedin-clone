import React, { useEffect, useState } from 'react';
import './Feed.scss';
import FlipMove from 'react-flip-move';
import PhotoIcon from '@mui/icons-material/Photo';
import YouTubeIcon from '@mui/icons-material/YouTube';
import EventIcon from '@mui/icons-material/Event';
import ArticleIcon from '@mui/icons-material/Article';
import { db } from '../../firebase/firebase';
import useTabletDimensions from '../../modules/isTablet';
import Sidebar from './Sidebar';
import Post from './Post';
import FeedModal from './FeedModal';
import UserAvatar from '../atoms/UserAvatar';
import IconButton from '../atoms/IconButton';

function Feed() {
  const [openModal, setOpenModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [posts, setPosts] = useState([]);
  const isTablet = useTabletDimensions();

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
        setEditModal={setEditModal}
        editModal={editModal}
      />
      {isTablet && <Sidebar className="sidebarMobile" />}
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
            data: { authorId, name, description, message, photoURL, timestamp },
          }) => (
            <Post
              key={id}
              postId={id}
              authorId={authorId}
              name={name}
              description={description}
              message={message}
              photoURL={photoURL}
              timestamp={timestamp}
              setEditModal={setEditModal}
              setOpenModal={setOpenModal}
            />
          ),
        )}
      </FlipMove>
    </main>
  );
}

export default Feed;
