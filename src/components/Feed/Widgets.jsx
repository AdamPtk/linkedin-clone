import React from 'react';
import './Widgets.scss';
import InfoIcon from '@mui/icons-material/Info';

function Widgets() {
  return (
    <aside className="widgets">
      <div className="widgets_header">
        <h2>Add to your feed</h2>
        <InfoIcon />
      </div>
      <div className="widgets_main">...</div>
    </aside>
  );
}

export default Widgets;
