import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { motion } from 'framer-motion';
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
        <motion.div 
          className={`theme-toggle ${darkMode ? 'dark' : 'light'}`} 
          onClick={toggleDarkMode}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div 
            className="toggle-circle"
            animate={{ 
              x: darkMode ? 22 : 0,
              backgroundColor: darkMode ? "#aabbff" : "#ffffff"
            }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          />
        </motion.div>
      </div>
    </nav>
  );
};

export default Navbar;
