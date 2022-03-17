import React from 'react';
import './HeaderOption.scss';
import PropTypes from 'prop-types';
import { Avatar } from '@mui/material';

function HeaderOption({ Icon, title, avatar }) {
  return (
    <div className="headerOption">
      {Icon && <Icon className="headerOption_icon" />}
      {avatar && <Avatar className="headerOption_icon" src={avatar} />}
      <p className="headerOption_title">{title}</p>
    </div>
  );
}

HeaderOption.propTypes = {
  Icon: PropTypes.instanceOf(Object),
  title: PropTypes.string.isRequired,
  avatar: PropTypes.string,
};

HeaderOption.defaultProps = {
  Icon: null,
  avatar: '',
};

export default HeaderOption;
