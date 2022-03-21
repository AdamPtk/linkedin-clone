import React, { forwardRef, useEffect, useState } from 'react';
import './Post.scss';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import firebase from 'firebase/compat/app';
import { Avatar, Button } from '@mui/material';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ChatIcon from '@mui/icons-material/Chat';
import ShareIcon from '@mui/icons-material/Share';
import SendIcon from '@mui/icons-material/Send';
import IconButton from '../atoms/IconButton';
import { db } from '../../firebase/firebase';
import { selectUser } from '../../features/userSlice';
import UserAvatar from '../atoms/UserAvatar';

const Post = forwardRef(
  ({ postId, name, description, message, photoURL }, ref) => {
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState('');
    const [likes, setLikes] = useState('');
    const [showComments, setShowComments] = useState(false);
    const user = useSelector(selectUser);

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

    const liked = () => likes.some((el) => el.uid === user.uid);

    return (
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
        <div className="post_statistics">
          <div>{`${likes.length} likes`}</div>
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
            onClick={liked ? null : like}
            Icon={liked ? ThumbUpAltIcon : ThumbUpOffAltIcon}
            title="Like"
            color={liked ? '#0a66c2' : ''}
          />
          <IconButton
            onClick={() => setShowComments(!showComments)}
            Icon={ChatIcon}
            title="Comment"
          />
          <IconButton Icon={ShareIcon} title="Share" />
          <IconButton Icon={SendIcon} title="Send" />
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
                    <h4>{comm.username}</h4>
                    <h6>{comm.email}</h6>
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
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  photoURL: PropTypes.string,
};

Post.defaultProps = {
  photoURL: '',
};

export default Post;
