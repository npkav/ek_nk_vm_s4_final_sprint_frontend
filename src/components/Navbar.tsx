import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { ThemeContext } from '../App';

const Navbar = () => {
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);

  return (
    <nav className="navbar">
      <NavLink to="/" className="navbar-logo">
        Airline Support
      </NavLink>
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
