// src/types/models.ts
export type UserStatus = 'Active' | 'Inactive' | 'Pending' | 'Blacklisted';


export interface User {
  id: string;
  organization: string;
  username: string;
  email: string;
  phoneNumber: string;
  dateJoined: string;
  status: string;
  profile: {
    firstName: string;
    lastName: string;
    avatar: string;
    gender: string;
    bvn: string;
    address: string;
  };
  education: {
    level: string;
    employmentStatus: string;
    sector: string;
    duration: string;
    officeEmail: string;
    monthlyIncome: [number, number];
    loanRepayment: number;
  };
  socials: {
    facebook: string;
    instagram: string;
    twitter: string;
  };
  guarantor: {
    fullName: string;
    phoneNumber: string;
    relationship: string;
  };
}