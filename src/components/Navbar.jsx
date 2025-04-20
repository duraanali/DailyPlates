import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Utensils } from 'lucide-react';
import '../styles/components/Navbar.css';

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="logo">
          <Utensils size={24} />
          <span>DailyPlates</span>
        </Link>
        <div className="nav-links">
          <Link 
            to="/" 
            className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
          >
            Home
          </Link>
          <Link 
            to="/healthy" 
            className={`nav-link ${location.pathname === '/healthy' ? 'active' : ''}`}
          >
            Healthy Picks
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;