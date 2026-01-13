import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FilterForm from '../FilterForm/FilterForm'; // Make sure this path is correct
import TableActions from './TableActions'; // Make sure this path is correct
// FIXED LINE BELOW: Added 'type'
import type { User } from '../../types/models';
import './user-table.scss';

// Add the props for filtering handlers
interface UserTableProps {
  users: User[];
  onFilter: (criteria: any) => void;
  onReset: () => void;
}

// Updated component definition to accept new props
const UserTable: React.FC<UserTableProps> = ({ users, onFilter, onReset }) => {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const navigate = useNavigate();

  const headers = [
    { label: 'ORGANIZATION', key: 'organization' },
    { label: 'USERNAME', key: 'username' },
    { label: 'EMAIL', key: 'email' },
    { label: 'PHONE NUMBER', key: 'phoneNumber' },
    { label: 'DATE JOINED', key: 'dateJoined' },
    { label: 'STATUS', key: 'status' },
  ];

  const toggleFilter = (column: string) => {
    setActiveFilter(activeFilter === column ? null : column);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="table-container">
      <table className="user-table">
        <thead>
          <tr>
            {headers.map((header) => (
              <th key={header.key} className="filterable-th">
                <div className="th-content" onClick={() => toggleFilter(header.key)}>
                  <span>{header.label}</span>
                  {/* Custom 3 unequal lines icon */}
                  <svg 
                    width="16" 
                    height="10" 
                    viewBox="0 0 16 10" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                    className="filter-icon"
                  >
                    <path d="M0 0H16V2H0V0ZM3 4H13V6H3V4ZM6 8H10V10H6V8Z" fill="#545F7D"/>
                  </svg>
                </div>
                
                {activeFilter === header.key && (
                  <FilterForm 
                    onFilter={(data) => {
                      onFilter(data); // Call the parent function
                      setActiveFilter(null);
                    }} 
                    onReset={() => {
                      onReset(); // Call the parent function
                      setActiveFilter(null);
                    }} 
                  />
                )}
              </th>
            ))}
            <th className="actions-header"></th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} onClick={() => navigate(`/users/${user.id}`)} className="clickable-row">
              <td>{user.organization}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.phoneNumber}</td>
              <td>{formatDate(user.dateJoined)}</td>
              <td>
                <span className={`status-pill status-pill--${user.status.toLowerCase()}`}>
                  {user.status}
                </span>
              </td>
              <td onClick={(e) => e.stopPropagation()} className="action-cell">
                <TableActions userId={user.id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;