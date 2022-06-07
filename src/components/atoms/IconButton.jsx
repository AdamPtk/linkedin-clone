import React from 'react';
import './IconButton.scss';
import PropTypes from 'prop-types';

function IconButton({ onClick, Icon, title, color, className, disabled }) {
  return (
    <div
      role="button"
      onKeyDown={() => {}}
      tabIndex={0}
      onClick={onClick}
      className={`iconButton ${className} ${disabled && 'iconButton_disabled'}`}
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
  disabled: PropTypes.bool,
};

IconButton.defaultProps = {
  onClick: () => {},
  color: '#666666',
  title: '',
  className: '',
  disabled: false,
};

export default IconButton;
