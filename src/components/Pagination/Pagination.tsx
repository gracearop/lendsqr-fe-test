import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';
import './pagination.scss';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (num: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const options = [10, 20, 50, 100];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="pagination-container">
      <div className="pagination-info">
        <span>Showing</span>
        
        <div className="items-per-page-wrapper" ref={dropdownRef}>
          <div 
            className="items-per-page-pill" 
            onClick={() => setShowDropdown(!showDropdown)}
          >
            {itemsPerPage} <ChevronDown size={14} />
          </div>

          {showDropdown && (
            <div className="items-dropdown">
              {options.map(option => (
                <div 
                  key={option} 
                  className={`option ${itemsPerPage === option ? 'selected' : ''}`}
                  onClick={() => {
                    onItemsPerPageChange(option);
                    setShowDropdown(false);
                  }}
                >
                  {option}
                </div>
              ))}
            </div>
          )}
        </div>

        <span>out of {totalItems}</span>
      </div>

      <div className="pagination-controls">
        <button 
          className="page-btn nav-btn"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
          <ChevronLeft size={16} />
        </button>

        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
          let pageNum = i + 1;
          if (totalPages > 5 && currentPage > 3) {
             pageNum = Math.min(currentPage - 2 + i, totalPages - (4 - i));
             pageNum = Math.max(pageNum, i + 1);
          }
          if (pageNum > totalPages || pageNum <= 0) return null;

          return (
            <button
              key={pageNum}
              className={`page-btn ${currentPage === pageNum ? 'active' : ''}`}
              onClick={() => onPageChange(pageNum)}
            >
              {pageNum}
            </button>
          );
        })}

        <button 
          className="page-btn nav-btn"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default Pagination;