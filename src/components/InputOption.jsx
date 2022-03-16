import React from 'react';
import './InputOption.scss';
import PropTypes from 'prop-types';

function InputOption({ Icon, title, color }) {
  return (
    <div className="inputOption">
      <Icon style={{ color }} />
      <p>{title}</p>
    </div>
  );
}

InputOption.propTypes = {
  Icon: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
};

export default InputOption;
