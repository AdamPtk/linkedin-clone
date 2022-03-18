import React from 'react';
import './HeaderOption.scss';
import PropTypes from 'prop-types';
import { Avatar } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';

function HeaderOption({ Icon, title, avatar, onClick }) {
  const user = useSelector(selectUser);
  return (
    <div
      role="button"
      tabIndex={0}
      className="headerOption"
      onClick={onClick}
      onKeyDown={() => {}}
    >
      {Icon && <Icon className="headerOption_icon" />}
      {avatar && (
        <Avatar className="headerOption_avatar">
          {user.displayName ? user.displayName[0] : null}
        </Avatar>
      )}
      <p className="headerOption_title">{title}</p>
    </div>
  );
}

HeaderOption.propTypes = {
  Icon: PropTypes.instanceOf(Object),
  title: PropTypes.string.isRequired,
  avatar: PropTypes.bool,
  onClick: PropTypes.func,
};

HeaderOption.defaultProps = {
  Icon: null,
  onClick: () => {},
  avatar: false,
};

export default HeaderOption;
