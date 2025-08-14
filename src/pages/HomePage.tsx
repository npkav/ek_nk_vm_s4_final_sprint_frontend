import { useNavigate } from 'react-router-dom';

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
        <div 
          className="dashboard-card" 
          onClick={() => handleNavigation('/customers')}
        >
          <div className="card-icon">👥</div>
          <h3>Customers</h3>
          <p>Manage customer profiles and track their reported issues</p>
        </div>
        <div 
          className="dashboard-card"
          onClick={() => handleNavigation('/feedback')}
        >
          <div className="card-icon">⭐</div>
          <h3>Feedback</h3>
          <p>View and analyze customer feedback and satisfaction ratings</p>
        </div>
        <div 
          className="dashboard-card"
          onClick={() => handleNavigation('/representatives')}
        >
          <div className="card-icon">👨‍✈️</div>
          <h3>Representatives</h3>
          <p>Manage service representatives and their assigned cases</p>
        </div>
        <div 
          className="dashboard-card"
          onClick={() => handleNavigation('/roles')}
        >
          <div className="card-icon">🔑</div>
          <h3>Roles</h3>
          <p>View and manage role assignments and department structure</p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
