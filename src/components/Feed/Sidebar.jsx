import { Avatar } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/userSlice';
import './Sidebar.scss';

function Sidebar() {
  const user = useSelector(selectUser);

  const recentItem = (topic) => (
    <div className="sidebar_recentItem">
      <span className="sidebar_hash">{`# ${topic}`}</span>
    </div>
  );

  return (
    <aside className="sidebar">
      <div className="sidebar_top">
        <img
          src="https://images.unsplash.com/32/Mc8kW4x9Q3aRR3RkP5Im_IMG_4417.jpg?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
          alt=""
        />
        <Avatar className="sidebar_avatar">
          {user.displayName ? user.displayName[0] : null}
        </Avatar>
        <div className="sidebar_profile">
          <h2>{user.displayName}</h2>
          <h4>{user.email}</h4>
        </div>
      </div>
      <div className="sidebar_stats">
        <div className="sidebar_stat">
          <p>Contacts</p>
          <p className="sidebar_statNumber">101</p>
        </div>
        <div className="sidebar_stat">
          <p>Who viewed you</p>
          <p className="sidebar_statNumber">234</p>
        </div>
      </div>
      <div className="sidebar_bottom">
        <p>Recent</p>
        {recentItem('reactjs')}
        {recentItem('programming')}
        {recentItem('UX')}
        {recentItem('accessibility')}
        {recentItem('wedesign')}
      </div>
    </aside>
  );
}

export default Sidebar;
