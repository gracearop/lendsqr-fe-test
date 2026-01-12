import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MoveLeft, Star } from 'lucide-react';
import usersData from '../../data/users.json';
import type { User } from '../../types/models';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import './user-details.scss';

const UserDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const [persistedUser, setPersistedUser] = useLocalStorage<User | null>('active_user', null);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const foundUser = (usersData as User[]).find(u => u.id === id);
    if (foundUser) {
      setUser(foundUser);
      setPersistedUser(foundUser);
    } else if (persistedUser && persistedUser.id === id) {
      setUser(persistedUser);
    }
  }, [id, setPersistedUser, persistedUser]);

  if (!user) return <div className="loading">Loading User Details...</div>;

  return (
    <div className="user-details-container">
      {/* 1. Navigation & Actions */}
      <button className="back-link" onClick={() => navigate('/users')}>
        <MoveLeft size={16} /> <span>Back to Users</span>
      </button>

      <div className="header-flex">
        <h2>User Details</h2>
        <div className="header-buttons">
          <button className="btn-blacklist">BLACKLIST USER</button>
          <button className="btn-activate">ACTIVATE USER</button>
        </div>
      </div>

      {/* 2. Top Summary Card */}
      <section className="summary-card">
        <div className="summary-card__top">
          <div className="user-profile">
            <img src={user.profile.avatar} alt="Avatar" className="avatar-img" />
            <div className="name-box">
              <h3>{user.profile.firstName} {user.profile.lastName}</h3>
              <p>{user.id.slice(0, 10)}</p>
            </div>
          </div>

          <div className="v-divider" />

          <div className="tier-box">
            <p>User's Tier</p>
            <div className="stars">
              <Star size={14} fill="#E9B200" color="#E9B200" />
              <Star size={14} color="#E9B200" />
              <Star size={14} color="#E9B200" />
            </div>
          </div>

          <div className="v-divider" />

          <div className="bank-box">
            <h3>₦{user.education.monthlyIncome[1].toLocaleString()}</h3>
            <p>{user.profile.bvn}/Providus Bank</p>
          </div>
        </div>

        <div className="summary-card__tabs">
          <span className="active-tab">General Details</span>
          <span>Documents</span>
          <span>Bank Details</span>
          <span>Loans</span>
          <span>Savings</span>
          <span>App and System</span>
        </div>
      </section>

      {/* 3. Detailed Information Grid */}
      <section className="details-content-card">
        {/* PERSONAL INFO */}
        <div className="info-group">
          <h4>Personal Information</h4>
          <div className="info-grid">
            <div className="info-item"><label>FULL NAME</label><p>{user.profile.firstName} {user.profile.lastName}</p></div>
            <div className="info-item"><label>PHONE NUMBER</label><p>{user.phoneNumber}</p></div>
            <div className="info-item"><label>EMAIL ADDRESS</label><p>{user.email}</p></div>
            <div className="info-item"><label>BVN</label><p>{user.profile.bvn}</p></div>
            <div className="info-item"><label>GENDER</label><p>{user.profile.gender}</p></div>
            <div className="info-item"><label>MARITAL STATUS</label><p>Single</p></div>
            <div className="info-item"><label>CHILDREN</label><p>None</p></div>
            <div className="info-item"><label>TYPE OF RESIDENCE</label><p>Parent's Apartment</p></div>
          </div>
        </div>

        <hr className="section-divider" />

        {/* EDUCATION INFO */}
        <div className="info-group">
          <h4>Education and Employment</h4>
          <div className="info-grid">
            <div className="info-item"><label>LEVEL OF EDUCATION</label><p>{user.education.level}</p></div>
            <div className="info-item"><label>EMPLOYMENT STATUS</label><p>{user.education.employmentStatus}</p></div>
            <div className="info-item"><label>SECTOR OF EMPLOYMENT</label><p>{user.education.sector}</p></div>
            <div className="info-item"><label>DURATION OF EMPLOYMENT</label><p>{user.education.duration}</p></div>
            <div className="info-item"><label>OFFICE EMAIL</label><p>{user.education.officeEmail}</p></div>
            <div className="info-item"><label>MONTHLY INCOME</label><p>₦{user.education.monthlyIncome[0].toLocaleString()} - ₦{user.education.monthlyIncome[1].toLocaleString()}</p></div>
            <div className="info-item"><label>LOAN REPAYMENT</label><p>{user.education.loanRepayment}</p></div>
          </div>
        </div>

        <hr className="section-divider" />

        {/* SOCIALS */}
        <div className="info-group">
          <h4>Socials</h4>
          <div className="info-grid">
            <div className="info-item"><label>TWITTER</label><p>{user.socials.twitter}</p></div>
            <div className="info-item"><label>FACEBOOK</label><p>{user.socials.facebook}</p></div>
            <div className="info-item"><label>INSTAGRAM</label><p>{user.socials.instagram}</p></div>
          </div>
        </div>

        <hr className="section-divider" />

        {/* GUARANTOR */}
        <div className="info-group">
          <h4>Guarantor</h4>
          <div className="info-grid">
            <div className="info-item"><label>FULL NAME</label><p>{user.guarantor.fullName}</p></div>
            <div className="info-item"><label>PHONE NUMBER</label><p>{user.guarantor.phoneNumber}</p></div>
            <div className="info-item"><label>RELATIONSHIP</label><p>{user.guarantor.relationship}</p></div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default UserDetails;