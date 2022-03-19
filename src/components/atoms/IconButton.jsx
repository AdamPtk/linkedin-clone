import React from 'react';
import './IconButton.scss';
import PropTypes from 'prop-types';

function InputOption({ Icon, title, color }) {
  return (
    <div className="iconButton">
      <Icon style={{ color }} />
      <p>{title}</p>
    </div>
  );
}

InputOption.propTypes = {
  Icon: PropTypes.instanceOf(Object).isRequired,
  title: PropTypes.string,
  color: PropTypes.string,
};

InputOption.defaultProps = {
  color: '#666666',
  title: '',
};

export default InputOption;
