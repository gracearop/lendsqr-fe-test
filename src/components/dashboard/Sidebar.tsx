import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  Briefcase, 
  ChevronDown, 
  Home, 
  LogOut
} from 'lucide-react';
import { sidebarMenu } from '../../constants/menu'; // Ensure this array exists
import './sidebar.scss';

interface SidebarProps {
  closeMobileMenu?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ closeMobileMenu }) => {
  const location = useLocation();

  return (
    <nav className="sidebar">
      {/* 1. Organization Switcher */}
      <div className="sidebar__org-switcher">
        <Briefcase size={16} />
        <span className="sidebar__org-text">Switch Organization</span>
        <ChevronDown size={14} />
      </div>

      <div className="sidebar__scroll-area">
        {/* 2. Dashboard Link */}
        <NavLink 
          to="/dashboard" 
          onClick={closeMobileMenu}
          className={({ isActive }) => 
            `sidebar__link ${isActive ? 'sidebar__link--active' : ''}`
          }
        >
          <Home size={16} />
          <span>Dashboard</span>
        </NavLink>

        {/* 3. Dynamic Menu Categories (Customers, Businesses, Settings) */}
        {sidebarMenu.map((category) => (
          <div key={category.title} className="sidebar__section">
            <h4 className="sidebar__section-title">{category.title}</h4>
            {category.items.map((item) => {
              
              // LOGIC: Keep "Users" active even when viewing /users/:id
              const isUserPath = item.path === '/users' && location.pathname.includes('/users');

              return (
                <NavLink 
                  key={item.name} 
                  to={item.path} 
                  onClick={closeMobileMenu}
                  className={({ isActive }) => 
                    `sidebar__link ${(isActive || isUserPath) ? 'sidebar__link--active' : ''}`
                  }
                >
                  <item.icon size={16} />
                  <span>{item.name}</span>
                </NavLink>
              );
            })}
          </div>
        ))}

        <hr className="sidebar__divider" />

        {/* 4. Logout Section */}
        <div className="sidebar__logout" onClick={() => console.log('Logging out...')}>
          <LogOut size={16} />
          <span>Logout</span>
        </div>
        
        {/* 5. Versioning Footer */}
        <div className="sidebar__footer">
          <span>v1.2.0</span>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;