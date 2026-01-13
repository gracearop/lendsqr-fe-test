import React from 'react';
import './stat-card.scss';

interface StatCardProps {
  icon: string;
  label: string;
  count: string;
  color: string;
}

const StatCard: React.FC<StatCardProps> = ({ icon, label, count, color }) => {
  return (
    <div className="stat-card">
      <div className={`stat-card__icon-container stat-card__icon-container--${color}`}>
          <img src={`/${icon}.png`} alt={label} />
      </div>
      <span className="stat-card__label">{label}</span>
      <h2 className="stat-card__count">{count}</h2>
    </div>
  );
};

export default StatCard;