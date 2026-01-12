import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/dashboard/Sidebar'; 
import Topbar from '../components/dashboard/Topbar'; 
import './dashboard-layout.scss';

const DashboardLayout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Function to toggle sidebar on mobile
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="dashboard-layout">
      {/* 1. Fixed Topbar */}
      <header className="dashboard-layout__top">
        <Topbar onMenuClick={toggleSidebar} />
      </header>

      <div className="dashboard-layout__body">
        {/* 2. Sidebar - Desktop: fixed width, Mobile: absolute/drawer */}
        <aside className={`dashboard-layout__sidebar ${isSidebarOpen ? 'dashboard-layout__sidebar--open' : ''}`}>
          <Sidebar />
        </aside>

        {/* 3. Main Content Area */}
        <main className="dashboard-layout__main">
          <div className="dashboard-layout__content">
            {/* The Outlet renders the UsersPage or UserDetails based on URL */}
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;