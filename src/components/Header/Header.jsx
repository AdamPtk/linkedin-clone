import React from 'react';
import './Header.scss';
import { useDispatch } from 'react-redux';
import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import ChatIcon from '@mui/icons-material/Chat';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import HeaderOption from './HeaderOption';
import { auth } from '../../firebase/firebase';
import { logout } from '../../features/userSlice';
import linkedinLogo from '../../assets/linkedin.png';

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    auth.signOut();
    navigate('/');
  };

  return (
    <header className="header">
      <div className="header_left">
        <Link to="/feed">
          <img src={linkedinLogo} alt="" />
        </Link>
        <div className="header_search">
          <SearchIcon />
          <input type="text" placeholder="Search" />
        </div>
      </div>
      <div className="header_right">
        <NavLink className={({ isActive }) => isActive && 'active'} to="/feed">
          <HeaderOption Icon={HomeIcon} title="Home" />
        </NavLink>
        <NavLink to="/mynetwork">
          <HeaderOption Icon={PeopleIcon} title="My Network" />
        </NavLink>
        <NavLink to="/jobs">
          <HeaderOption Icon={BusinessCenterIcon} title="Jobs" />
        </NavLink>
        <NavLink to="/messages">
          <HeaderOption Icon={ChatIcon} title="Messages" />
        </NavLink>
        <NavLink to="/notifications">
          <HeaderOption Icon={NotificationsIcon} title="Notifications" />
        </NavLink>
        <HeaderOption onClick={handleLogout} title="Me" avatar />
      </div>
    </header>
  );
}

export default Header;