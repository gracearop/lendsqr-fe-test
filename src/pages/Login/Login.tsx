import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.scss';
import loginImage from '../../assets/image.png'; 
import logo from '../../assets/logo.png';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  
  const navigate = useNavigate();
  
    const handleLogin = (e: React.FormEvent) => {
      e.preventDefault();
      
      if (!email || !password) {
        setError('Please enter your email');
        return;
      }

      setError('');
      navigate('/users'); 
    };

  return (
    <div className="login-container">
      <div className="login-container__left">
        <div className="logo-wrapper">
          <img src={logo} alt="Lendsqr Logo" />
        </div>
        <div className="illustration-wrapper">
          <img src={loginImage} alt="Login Illustration" />
        </div>
      </div>

      <div className="login-container__right">
        <form className="login-form" onSubmit={handleLogin} noValidate>
          <h1>Welcome!</h1>
          <p>Enter details to login.</p>

          <div className="form-group">
            <input 
              type="email" 
              placeholder="Email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
          </div>

          <div className="form-group password-group">
            <input 
              type={showPassword ? "text" : "password"} 
              placeholder="Password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
            <button 
              type="button" 
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "HIDE" : "SHOW"}
            </button>
          </div>

          {/* Validation Message Area */}
          {error && <p className="error-message" role="alert">{error}</p>}

          <a href="#" className="forgot-password">FORGOT PASSWORD?</a>

          <button type="submit" className="btn-login">LOG IN</button>
        </form>
      </div>
    </div>
  );
};

export default Login;