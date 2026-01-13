import React from 'react';
import './stat-card.scss';

import usersIcon from '../../assets/icons/users-icon.png';
import activeUsersIcon from '../../assets/icons/active-users-icon.png';
import loansIcon from '../../assets/icons/loans-icon.png';
import savingsIcon from '../../assets/icons/savings-icon.png';

interface StatCardProps {
  icon: string;
  label: string;
  count: string;
  color: string;
}

const StatCard: React.FC<StatCardProps> = ({ icon, label, count, color }) => {
  
  const iconMap: Record<string, string> = {
    'users-icon': usersIcon,
    'active-users-icon': activeUsersIcon,
    'loans-icon': loansIcon,
    'savings-icon': savingsIcon,
  };

  const iconSrc = iconMap[icon];

  return (
    <div className="stat-card">
      <div className={`stat-card__icon-container stat-card__icon-container--${color}`}>
        {iconSrc ? (
          <img src={iconSrc} alt={label} />
        ) : (
          <span>Icon not found</span> 
        )}
      </div>
      <span className="stat-card__label">{label}</span>
      <h2 className="stat-card__count">{count}</h2>
    </div>
  );
};

export default StatCard;