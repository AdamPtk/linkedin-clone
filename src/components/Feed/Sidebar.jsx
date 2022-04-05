import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/userSlice';
import useTabletDimensions from '../../modules/isTablet';
import UserAvatar from '../atoms/UserAvatar';
import './Sidebar.scss';

function Sidebar({ className }) {
  const user = useSelector(selectUser);
  const isTablet = useTabletDimensions();

  const recentItem = (topic) => (
    <div className="sidebar_recentItem">
      <span className="sidebar_hash">{`# ${topic}`}</span>
    </div>
  );

  return (
    <aside className={className}>
      <div className="sidebar_top">
        <img
          src="https://images.unsplash.com/32/Mc8kW4x9Q3aRR3RkP5Im_IMG_4417.jpg?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
          alt=""
        />
        <UserAvatar className="sidebar_avatar" />
        <div className="sidebar_profile">
          <h2>{user.displayName}</h2>
          <h4>{user.email}</h4>
        </div>
      </div>
      {!isTablet && (
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
      )}
      {!isTablet && (
        <div className="sidebar_bottom">
          <p>Recent</p>
          {recentItem('reactjs')}
          {recentItem('programming')}
          {recentItem('UX')}
          {recentItem('accessibility')}
          {recentItem('wedesign')}
        </div>
      )}
    </aside>
  );
}

Sidebar.propTypes = {
  className: PropTypes.string.isRequired,
};

export default Sidebar;
