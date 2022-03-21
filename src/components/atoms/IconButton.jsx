import React from 'react';
import './IconButton.scss';
import PropTypes from 'prop-types';

function InputOption({ onClick, Icon, title, color }) {
  return (
    <div
      role="button"
      onKeyDown={() => {}}
      tabIndex={0}
      onClick={onClick}
      className="iconButton"
    >
      <Icon style={{ color }} />
      <p>{title}</p>
    </div>
  );
}

InputOption.propTypes = {
  onClick: PropTypes.func,
  Icon: PropTypes.instanceOf(Object).isRequired,
  title: PropTypes.string,
  color: PropTypes.string,
};

InputOption.defaultProps = {
  onClick: () => {},
  color: '#666666',
  title: '',
};

export default InputOption;
