import React, { useMemo } from 'react';
import { useUsers, type FilterCriteria } from '../hooks/useUsers';import UserTable from '../components/UserTable/UserTable';
import Pagination from '../components/Pagination/Pagination';
import StatCard from '../components/dashboard/StatCard';
import usersDataRaw from '../data/users.json'; 
import type { User } from '../types/models';
import './users.scss';

const usersData = usersDataRaw as User[];

const UsersPage: React.FC = () => {
  // 1. Data Logic for the Table (Filtering/Pagination)
  const { 
    users, 
    totalUsers,
    totalPages,
    currentPage, 
    goToPage,
    updateFilter, 
    resetFilters  
  } = useUsers(usersData);

  // 2. Data Logic for the Stat Cards
  const stats = useMemo(() => {
    return [
      {
        label: 'USERS',
        count: usersData.length.toLocaleString(),
        icon: 'users-icon', 
        color: 'pink',
      },
      {
        label: 'ACTIVE USERS',
        count: usersData.filter((u) => u.status === 'Active').length.toLocaleString(),
        icon: 'active-users-icon',
        color: 'purple',
      },
      {
        label: 'USERS WITH LOANS',
        count: usersData.filter((u) => u.education?.loanRepayment > 0).length.toLocaleString(),
        icon: 'loans-icon',
        color: 'orange',
      },
      {
        label: 'USERS WITH SAVINGS',
        count: '102,453', 
        icon: 'savings-icon',
        color: 'red',
      }
    ];
  }, []);

  return (
    <div className="users-page">
      <h1 className="page-title">Users</h1>
      
      {/* 3. Stat Cards Section */}
      <div className="stats-grid">
        {stats.map((stat, index) => (
          <StatCard 
            key={index} 
            label={stat.label}
            count={stat.count}
            icon={stat.icon}
            color={stat.color}
          />
        ))}
      </div>

      {/* 4. The Table with Filter Handlers */}
      <UserTable 
        users={users} 
        onFilter={(criteria: FilterCriteria) => updateFilter(criteria)}
        onReset={resetFilters}
      />

      {/* 5. Pagination Controls */}
      <Pagination 
        currentPage={currentPage}
        totalItems={totalUsers}
        totalPages={totalPages}
        itemsPerPage={10}
        onPageChange={goToPage}
      />
    </div>
  );
};

export default UsersPage;