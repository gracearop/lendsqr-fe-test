import { 
  Users,
  Home, 
  UserCheck, 
  UserX, 
  Briefcase, 
  HandCoins, 
  PiggyBank, 
  UsersRound, 
  Percent,
  SlidersHorizontal,
  ShieldCheck 
} from 'lucide-react';

export const sidebarMenu = [
  {
    title: 'CUSTOMERS',
    items: [
      { name: 'Users', icon: Users, path: '/users' },
      { name: 'Guarantors', icon: UsersRound, path: '/guarantors' },
      { name: 'Loans', icon: HandCoins, path: '/loans' },
      { name: 'Decision Models', icon: UserCheck, path: '/decision-models' },
      { name: 'Savings', icon: PiggyBank, path: '/savings' },
      { name: 'Loan Requests', icon: HandCoins, path: '/loan-requests' },
      { name: 'Whitelist', icon: ShieldCheck, path: '/whitelist' },
      { name: 'Karma', icon: UserX, path: '/karma' },
    ],
  },
  
  {
    title: 'BUSINESSES',
    items: [
      { name: 'Organization', icon: Briefcase, path: '/organization' },
      { name: 'Loan Products', icon: HandCoins, path: '/loan-products' },
      { name: 'Savings Products', icon: Home, path: '/savings-products' },
      { name: 'Fees and Charges', icon: HandCoins, path: '/fees' },
      { name: 'Transactions', icon: SlidersHorizontal, path: '/transactions' },
      { name: 'Services', icon: SlidersHorizontal, path: '/services' },
      { name: 'Service Account', icon: UserCheck, path: '/service-account' },
      { name: 'Settlements', icon: SlidersHorizontal, path: '/settlements' },
      { name: 'Reports', icon: SlidersHorizontal, path: '/reports' },
    ],
  },
  {
    title: 'SETTINGS',
    items: [
      { name: 'Preferences', icon: SlidersHorizontal, path: '/preferences' },
      { name: 'Fees and Pricing', icon: Percent, path: '/pricing' },
      { name: 'Audit Logs', icon: SlidersHorizontal, path: '/audit' },
    ],
  },
];