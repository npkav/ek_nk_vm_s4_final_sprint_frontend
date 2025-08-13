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
        Welcome to the Airline Support Dashboard. Please select a section below to get started.
      </p>
      <div className="dashboard-summary">
        <div 
          className="dashboard-card" 
          onClick={() => handleNavigation('/customers')}
        >
          <h3>Customers</h3>
          <p>Manage customers and their reported issues</p>
        </div>
        <div 
          className="dashboard-card"
          onClick={() => handleNavigation('/feedback')}
        >
          <h3>Feedback</h3>
          <p>View and analyze customer feedback and ratings</p>
        </div>
        <div 
          className="dashboard-card"
          onClick={() => handleNavigation('/representatives')}
        >
          <h3>Representatives</h3>
          <p>Manage service reps and their assigned issues</p>
        </div>
        <div 
          className="dashboard-card"
          onClick={() => handleNavigation('/roles')}
        >
          <h3>Roles</h3>
          <p>View roles and departments structure</p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
