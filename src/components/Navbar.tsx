import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { ThemeContext } from '../App';

const Navbar = () => {
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <NavLink to="/" className="navbar-logo">
          <span className="logo-text">Airline Support</span>
        </NavLink>
      </div>
      <div className="navbar-links">
        <NavLink to="/customers" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Customers</NavLink>
        <NavLink to="/feedback" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Feedback</NavLink>
        <NavLink to="/representatives" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Representatives</NavLink>
        <NavLink to="/roles" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Roles</NavLink>
      </div>
      <div className="theme-toggle-container">
        <span className="toggle-label">{darkMode ? 'Night' : 'Day'}</span>
        <div 
          className={`theme-toggle ${darkMode ? 'dark' : 'light'}`} 
          onClick={toggleDarkMode}
        >
          <div className="toggle-circle"></div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
