import React, { forwardRef, useEffect, useState } from 'react';
import './Post.scss';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import firebase from 'firebase/compat/app';
import { Avatar, Button } from '@mui/material';
import Popover from '@mui/material/Popover';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ChatIcon from '@mui/icons-material/Chat';
import ShareIcon from '@mui/icons-material/Share';
import SendIcon from '@mui/icons-material/Send';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import FlagIcon from '@mui/icons-material/Flag';
import { db } from '../../firebase/firebase';
import { selectUser } from '../../features/userSlice';
import useMobileDimensions from '../../modules/isMobile';
import IconButton from '../atoms/IconButton';
import UserAvatar from '../atoms/UserAvatar';
import AddedTime from '../atoms/AddedTime';

function MoreIcon({ ownPost }) {
  const [popover, setPopover] = useState(null);

  const open = Boolean(popover);
  const id = open ? 'headerAvatar_popover' : undefined;

  const handleClick = (event) => {
    setPopover(event.currentTarget);
  };

  const handleClose = () => {
    setPopover(null);
  };
  return (
    <>
      <IconButton
        Icon={MoreHorizIcon}
        onClick={handleClick}
        className="post_moreIcon"
      />
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
        <div className="post_moreIcon_popover">
          {ownPost ? (
            <>
              <div className="post_moreIcon_popover_option">
                <EditIcon />
                <p>Edit post</p>
              </div>
              <div className="post_moreIcon_popover_option">
                <DeleteIcon />
                <p>Delete post</p>
              </div>
            </>
          ) : (
            <div className="post_moreIcon_popover_option">
              <FlagIcon />
              <p>Report</p>
            </div>
          )}
        </div>
      </Popover>
    </>
  );
}

const Post = forwardRef(
  (
    { authorId, postId, name, description, message, photoURL, timestamp },
    ref,
  ) => {
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState('');
    const [likes, setLikes] = useState('');
    const [showComments, setShowComments] = useState(false);
    const user = useSelector(selectUser);
    const isMobile = useMobileDimensions();

    useEffect(() => {
      let unsubscribeComments;
      let unsubscribeLikes;
      if (postId) {
        unsubscribeComments = db
          .collection('posts')
          .doc(postId)
          .collection('comments')
          .orderBy('timestamp')
          .onSnapshot((snapshot) => {
            setComments(snapshot.docs.map((doc) => doc.data()));
          });
        unsubscribeLikes = db
          .collection('posts')
          .doc(postId)
          .collection('likes')
          .onSnapshot((snapshot) => {
            setLikes(snapshot.docs.map((doc) => doc.data()));
          });
      }
      return () => {
        unsubscribeComments();
        unsubscribeLikes();
      };
    }, [postId]);

    const postComment = (e) => {
      e.preventDefault();
      db.collection('posts').doc(postId).collection('comments').add({
        authorId: user.uid,
        comment,
        username: user.displayName,
        photoURL: user.photoURL,
        email: user.email,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
      setComment('');
    };

    const like = () => {
      db.collection('posts').doc(postId).collection('likes').add({
        username: user.displayName,
        uid: user.uid,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
    };

    const dislike = () => {
      db.collection('posts')
        .doc(postId)
        .collection('likes')
        .where('uid', '==', user.uid)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            doc.ref.delete();
          });
        });
    };

    const liked = likes && likes.some((el) => el.uid === user.uid);

    const ownPost = user.uid === authorId;

    return (
      <div ref={ref} className="post">
        <MoreIcon ownPost={ownPost} />
        <div className="post_header">
          <Avatar src={photoURL} alt="">
            {name[0]}
          </Avatar>
          <div className="post_info">
            <h2>{name}</h2>
            <p>{description}</p>
            <AddedTime timestamp={timestamp} />
          </div>
        </div>
        <div className="post_body">
          <p>{message}</p>
        </div>
        <div className="post_statistics">
          <div>
            {`${likes.length} ${likes.length !== 1 ? 'likes' : 'like'}`}
          </div>
          <div
            role="button"
            onKeyDown={() => {}}
            tabIndex={0}
            onClick={() => setShowComments(!showComments)}
          >
            {`${comments.length} comments`}
          </div>
        </div>
        <div className="post_buttons">
          <IconButton
            onClick={liked ? dislike : like}
            Icon={liked ? ThumbUpAltIcon : ThumbUpOffAltIcon}
            title={isMobile ? null : 'Like'}
            color={liked ? '#0a66c2' : ''}
          />
          <IconButton
            onClick={() => setShowComments(!showComments)}
            Icon={ChatIcon}
            title={isMobile ? null : 'Comment'}
          />
          <IconButton Icon={ShareIcon} title={isMobile ? null : 'Share'} />
          <IconButton Icon={SendIcon} title={isMobile ? null : 'Send'} />
        </div>
        {showComments && (
          <>
            <form className="post_commentBox">
              <div>
                <UserAvatar />
                <div className="post_inputSection">
                  <input
                    className="post_input"
                    type="text"
                    placeholder="Add a comment..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                  {comment && (
                    <Button
                      className="post_button"
                      variant="contained"
                      type="submit"
                      onClick={postComment}
                    >
                      Post
                    </Button>
                  )}
                </div>
              </div>
            </form>
            <div className="post_comments">
              {comments.map((comm) => (
                <div className="post_comment" key={comm.timestamp}>
                  <Avatar className="post_comment_avatar" src={comm.photoURL}>
                    {comm.displayName ? comm.displayName[0] : null}
                  </Avatar>
                  <div className="post_comment_content">
                    <div className="post_comment_info">
                      <div className="left">
                        <h4>
                          {comm.username}
                          &nbsp;
                          {comm.authorId === authorId && <span>Author</span>}
                        </h4>
                        <h6>{comm.email}</h6>
                      </div>
                      <div className="right">
                        <AddedTime timestamp={comm.timestamp} />
                      </div>
                    </div>
                    <p>{comm.comment}</p>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    );
  },
);

Post.propTypes = {
  postId: PropTypes.string.isRequired,
  authorId: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  photoURL: PropTypes.string,
  timestamp: PropTypes.instanceOf(Object).isRequired,
};

Post.defaultProps = {
  photoURL: '',
};

MoreIcon.propTypes = {
  ownPost: PropTypes.bool.isRequired,
};

export default Post;
