import React, { useState, useEffect, useRef } from 'react';
import './filter-form.scss';

interface FilterFormProps {
  onFilter: (criteria: any) => void;
  onReset: () => void;
}

const FilterForm: React.FC<FilterFormProps> = ({ onFilter, onReset }) => {
  const formRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    organization: '',
    username: '',
    email: '',
    dateJoined: '',
    phoneNumber: '',
    status: ''
  });

  // Handle clicking outside the form
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (formRef.current && !formRef.current.contains(event.target as Node)) {
        onReset(); // Closes the form when clicking outside
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onReset]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFilter(formData);
  };

  return (
    <div className="filter-form" ref={formRef} onClick={(e) => e.stopPropagation()}>
      <form onSubmit={handleSubmit}>
        <div className="filter-group">
          <label>Organization</label>
          <select name="organization" value={formData.organization} onChange={handleChange}>
            <option value="">Select</option>
            <option value="Lendsqr">Lendsqr</option>
            <option value="Irorun">Irorun</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Username</label>
          <input 
            name="username" 
            type="text" 
            placeholder="User" 
            value={formData.username} 
            onChange={handleChange}
          />
        </div>

        <div className="filter-group">
          <label>Email</label>
          <input 
            name="email" 
            type="email" 
            placeholder="Email" 
            value={formData.email} 
            onChange={handleChange}
          />
        </div>

        <div className="filter-group">
          <label>Date</label>
          <input 
            name="dateJoined" 
            type="date" 
            value={formData.dateJoined} 
            onChange={handleChange}
          />
        </div>

        <div className="filter-group">
          <label>Phone Number</label>
          <input 
            name="phoneNumber" 
            type="text" 
            placeholder="Phone Number" 
            value={formData.phoneNumber} 
            onChange={handleChange}
          />
        </div>

        <div className="filter-group">
          <label>Status</label>
          <select name="status" value={formData.status} onChange={handleChange}>
            <option value="">Select</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="Pending">Pending</option>
            <option value="Blacklisted">Blacklisted</option>
          </select>
        </div>
        
        <div className="filter-actions">
          <button type="button" className="btn-outline" onClick={onReset}>Reset</button>
          <button type="submit" className="btn-primary">Filter</button>
        </div>
      </form>
    </div>
  );
};

export default FilterForm;