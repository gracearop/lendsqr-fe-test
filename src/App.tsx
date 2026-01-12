import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import Login from './pages/Login/Login';
import UsersPage from './pages/Users';
import UserDetails from './pages/UserDetails/UserDetails';

function App() {
  return (
    <Router>

    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />

      <Route element={<DashboardLayout />}>
        <Route path="users" element={<UsersPage />} />
        <Route path="users/:id" element={<UserDetails />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>

    </Router>
  );
}

export default App;

