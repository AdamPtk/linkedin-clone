import React from 'react';
import './IconButton.scss';
import PropTypes from 'prop-types';

function IconButton({ onClick, Icon, title, color, className }) {
  return (
    <div
      role="button"
      onKeyDown={() => {}}
      tabIndex={0}
      onClick={onClick}
      className={`iconButton ${className}`}
    >
      <Icon style={{ color }} />
      <p>{title}</p>
    </div>
  );
}

IconButton.propTypes = {
  onClick: PropTypes.func,
  Icon: PropTypes.instanceOf(Object).isRequired,
  title: PropTypes.string,
  color: PropTypes.string,
  className: PropTypes.string,
};

IconButton.defaultProps = {
  onClick: () => {},
  color: '#666666',
  title: '',
  className: '',
};

export default IconButton;
