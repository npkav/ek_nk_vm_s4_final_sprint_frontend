import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const HomePage = () => {
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <div className="page-container">
      <h1 className="page-title">Airline Support Dashboard</h1>
      <p className="welcome-text">
        Welcome to Airline Support - your centralized platform for airline customer service management. 
        Select a category below to manage support tickets, feedback, and service operations.
      </p>
      <div className="dashboard-summary">
        <motion.div 
          className="dashboard-card" 
          onClick={() => handleNavigation('/customers')}
          whileHover={{ 
            y: -10, 
            boxShadow: "0 15px 30px var(--shadow-medium)",
            background: "var(--card-bg-hover)"
          }}
          whileTap={{ y: -1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <motion.div 
            className="card-icon"
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            👥
          </motion.div>
          <h3>Customers</h3>
          <p>Manage customer profiles and track their reported issues</p>
        </motion.div>
        <motion.div 
          className="dashboard-card"
          onClick={() => handleNavigation('/feedback')}
          whileHover={{ 
            y: -10, 
            boxShadow: "0 15px 30px var(--shadow-medium)",
            background: "var(--card-bg-hover)"
          }}
          whileTap={{ y: -1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <motion.div 
            className="card-icon"
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            ⭐
          </motion.div>
          <h3>Feedback</h3>
          <p>View and analyze customer feedback and satisfaction ratings</p>
        </motion.div>
        <motion.div 
          className="dashboard-card"
          onClick={() => handleNavigation('/representatives')}
          whileHover={{ 
            y: -10, 
            boxShadow: "0 15px 30px var(--shadow-medium)",
            background: "var(--card-bg-hover)"
          }}
          whileTap={{ y: -1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <motion.div 
            className="card-icon"
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            👨‍✈️
          </motion.div>
          <h3>Representatives</h3>
          <p>Manage service representatives and their assigned cases</p>
        </motion.div>
        <motion.div 
          className="dashboard-card"
          onClick={() => handleNavigation('/roles')}
          whileHover={{ 
            y: -10, 
            boxShadow: "0 15px 30px var(--shadow-medium)",
            background: "var(--card-bg-hover)"
          }}
          whileTap={{ y: -1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <motion.div 
            className="card-icon"
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            🔑
          </motion.div>
          <h3>Roles</h3>
          <p>View and manage role assignments and department structure</p>
        </motion.div>
      </div>
    </div>
  );
};

export default HomePage;
