import { useState, useMemo } from 'react';
import type { User } from '../types/models';

export interface FilterCriteria {
  organization?: string;
  username?: string;
  email?: string;
  phoneNumber?: string;
  dateJoined?: string;
  status?: string;
}

export const useUsers = (users: User[], itemsPerPage = 10) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<FilterCriteria>({});

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      return Object.entries(filters).every(([key, value]) => {
        if (!value) return true;
        
        // Use type assertion safely
        const userValue = user[key as keyof User];
        
        if (typeof userValue === 'string') {
          return userValue.toLowerCase().includes(value.toLowerCase());
        }
        return true;
      });
    });
  }, [users, filters]);

  const paginatedUsers = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredUsers.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredUsers, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  const goToPage = (page: number) => setCurrentPage(page);

  const updateFilter = (newFilters: FilterCriteria) => {
    setFilters(newFilters); // Replaces filters with new criteria
    setCurrentPage(1);
  };

  const resetFilters = () => {
    setFilters({});
    setCurrentPage(1);
  };

  return {
    users: paginatedUsers,
    totalUsers: filteredUsers.length,
    currentPage,
    totalPages,
    goToPage,
    updateFilter,
    resetFilters
  };
};