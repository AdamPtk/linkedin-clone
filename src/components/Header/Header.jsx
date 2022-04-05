import React from 'react';
import './Header.scss';
import { Link, NavLink } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import ChatIcon from '@mui/icons-material/Chat';
import NotificationsIcon from '@mui/icons-material/Notifications';
import useMobileDimensions from '../../modules/isMobile';
import useTabletDimensions from '../../modules/isTablet';
import HeaderOption from './HeaderOption';
import linkedinLogo from '../../assets/linkedin.png';
import HeaderAvatar from './HeaderAvatar';

function Header() {
  const isMobile = useMobileDimensions();
  const isTablet = useTabletDimensions();
  return (
    <header className="header">
      <div className="header_container">
        <div className="header_left">
          <Link to="/feed">
            <img src={linkedinLogo} alt="" />
          </Link>
          {isTablet ? (
            <div className="header_search_mobile">
              <SearchIcon />
            </div>
          ) : (
            <div className="header_search">
              <SearchIcon />
              <input type="text" placeholder="Search" />
            </div>
          )}
        </div>
        <div className="header_right">
          <NavLink
            className={({ isActive }) => isActive && 'active'}
            to="/feed"
          >
            <HeaderOption Icon={HomeIcon} title="Home" />
          </NavLink>
          <NavLink to="/mynetwork">
            <HeaderOption Icon={PeopleIcon} title="My Network" />
          </NavLink>
          {!isMobile && (
            <NavLink to="/jobs">
              <HeaderOption Icon={BusinessCenterIcon} title="Jobs" />
            </NavLink>
          )}
          <NavLink to="/messages">
            <HeaderOption Icon={ChatIcon} title="Messages" />
          </NavLink>
          {!isMobile && (
            <NavLink to="/notifications">
              <HeaderOption Icon={NotificationsIcon} title="Notifications" />
            </NavLink>
          )}
          <HeaderAvatar />
        </div>
      </div>
    </header>
  );
}

export default Header;
