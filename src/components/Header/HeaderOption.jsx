import React from 'react';
import './HeaderOption.scss';
import PropTypes from 'prop-types';

function HeaderOption({ Icon, title }) {
  return (
    <div
      role="button"
      tabIndex={0}
      className="headerOption"
      onKeyDown={() => {}}
    >
      {Icon && <Icon className="headerOption_icon" />}
      <p className="headerOption_title">{title}</p>
    </div>
  );
}

HeaderOption.propTypes = {
  Icon: PropTypes.instanceOf(Object).isRequired,
  title: PropTypes.string.isRequired,
};

export default HeaderOption;
