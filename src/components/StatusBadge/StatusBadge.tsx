import React from 'react';
import type { UserStatus } from '../../types/models'; // The enum we made earlier
import './status-badge.scss';

interface StatusBadgeProps {
  status: UserStatus; // Uses the Enum for type safety
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  // Helper to normalize class names (e.g., "Active" -> "active")
  const className = `status-badge status-badge--${status.toLowerCase()}`;

  return (
    <div className={className}>
      {status}
    </div>
  );
};

export default StatusBadge;