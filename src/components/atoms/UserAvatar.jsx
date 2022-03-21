import React from 'react';
import PropTypes from 'prop-types';
import { Avatar } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/userSlice';

function UserAvatar({ className }) {
  const user = useSelector(selectUser);

  return (
    <Avatar className={className} src={user.photoURL}>
      {user.displayName ? user.displayName[0] : null}
    </Avatar>
  );
}

UserAvatar.propTypes = {
  className: PropTypes.string,
};

UserAvatar.defaultProps = {
  className: '',
};

export default UserAvatar;
