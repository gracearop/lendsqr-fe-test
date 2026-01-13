// src/hooks/useUsers.ts
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

export const useUsers = (users: User[], initialItemsPerPage = 10) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(initialItemsPerPage);
  const [filters, setFilters] = useState<FilterCriteria>({});

  // 1. Filtering Logic
  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      return Object.entries(filters).every(([key, value]) => {
        if (!value) return true;

        // Use key mapping if the filter keys don't match the model keys exactly
        // Otherwise, access the user object dynamically
        const userValue = user[key as keyof User];

        if (typeof userValue === 'string') {
          return userValue.toLowerCase().includes(value.toLowerCase());
        }
        return true;
      });
    });
  }, [users, filters]);

  // 2. Pagination Logic
  const paginatedUsers = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredUsers.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredUsers, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  // 3. Action Handlers
  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  const changeItemsPerPage = (num: number) => {
    setItemsPerPage(num);
    setCurrentPage(1); // Always reset to page 1 when changing entries count
  };

  const updateFilter = (newFilters: FilterCriteria) => {
    setFilters(newFilters);
    setCurrentPage(1); // Reset to page 1 when applying new filters
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
    itemsPerPage,
    setItemsPerPage: changeItemsPerPage,
    goToPage,
    updateFilter,
    resetFilters,
  };
};