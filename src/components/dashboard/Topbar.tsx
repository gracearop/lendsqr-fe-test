import React from 'react';
import { Search, Bell} from 'lucide-react'; // Added Menu icon for better accessibility
import logo from '../../assets/logo.png';
import avatar from '../../assets/avatar.png';
import './topbar.scss';

interface TopbarProps {
  onMenuClick: () => void;
}

const Topbar: React.FC<TopbarProps> = ({ onMenuClick }) => {
  return (
    <header className="topbar">
      {/* 1. Left Section: Logo & Mobile Toggle */}
      <div className="topbar__logo-container">
        <button className="mobile-menu-btn" onClick={onMenuClick}>
           <span></span><span></span><span></span>
        </button>
        <img src={logo} alt="Lendsqr" className="logo" />
      </div>

      {/* 2. Center Section: Search Bar */}
      <div className="topbar__search-container">
        <div className="search-bar">
          <input type="text" placeholder="Search for anything" />
          <button className="search-btn">
            <Search size={14} color="white" />
          </button>
        </div>
      </div>

      {/* 3. Right Section: Profile & Actions */}
      <div className="topbar__right">
        <a href="#" className="docs-link">Docs</a>
        <div className="notification">
          <Bell size={20} color="#213F7D" />
        </div>
        <div className="user-profile">
          <img src={avatar} alt="User" />
          <span className="user-name">Adedeji</span>
          <span className="dropdown-icon">▼</span>
        </div>
      </div>
    </header>
  );
};

export default Topbar;