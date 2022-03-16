import React from 'react';
import './Header.scss';
import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import ChatIcon from '@mui/icons-material/Chat';
import NotificationsIcon from '@mui/icons-material/Notifications';
import HeaderOption from './HeaderOption';

function Header() {
  return (
    <header className="header">
      <div className="header_left">
        <img
          src="https://cdn-icons.flaticon.com/png/512/3536/premium/3536505.png?token=exp=1647377394~hmac=2c98d16584f6b6c08b771a9ac9348138"
          alt=""
        />
        <div className="header_search">
          <SearchIcon />
          <input type="text" placeholder="Search" />
        </div>
      </div>
      <div className="header_right">
        <HeaderOption Icon={HomeIcon} title="Home" />
        <HeaderOption Icon={PeopleIcon} title="My Network" />
        <HeaderOption Icon={BusinessCenterIcon} title="Jobs" />
        <HeaderOption Icon={ChatIcon} title="Messages" />
        <HeaderOption Icon={NotificationsIcon} title="Notifications" />
        <HeaderOption
          avatar="https://lh3.googleusercontent.com/a-/AOh14GjtE7W8lwvqhMbUEIVYupR08cY0TzFX3prMW84SOA=s96-c-rg-br100"
          title="me"
        />
      </div>
    </header>
  );
}

export default Header;
