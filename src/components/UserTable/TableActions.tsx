import React, { useState, useRef, useEffect } from 'react';
import { MoreVertical, Eye, UserX, UserCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './table-actions.scss';

interface TableActionsProps {
  userId: string;
}

const TableActions: React.FC<TableActionsProps> = ({ userId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="table-actions" ref={menuRef}>
      <button className="action-trigger" onClick={() => setIsOpen(!isOpen)}>
        <MoreVertical size={16} />
      </button>

      {isOpen && (
        <div className="action-menu">
          <div className="action-item" onClick={() => navigate(`/users/${userId}`)}>
            <Eye size={14} /> <span>View Details</span>
          </div>
          <div className="action-item">
            <UserX size={14} /> <span>Blacklist User</span>
          </div>
          <div className="action-item">
            <UserCheck size={14} /> <span>Activate User</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default TableActions;