import React from 'react';
import './AddedTime.scss';
import PropTypes from 'prop-types';
import TimeAgo from 'timeago-react';

function AddedTime({ timestamp }) {
  return (
    <div className="addedTime">
      <TimeAgo datetime={timestamp && timestamp.seconds * 1000} live={false} />
    </div>
  );
}

AddedTime.propTypes = {
  timestamp: PropTypes.instanceOf(Object).isRequired,
};

export default AddedTime;
