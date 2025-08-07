import { useState } from 'react';
import { Link } from 'react-router-dom';

const CustomerPage = () => {
  const [activeSection, setActiveSection] = useState<number | null>(null);

  const handleSectionClick = (sectionNumber: number) => {
    setActiveSection(sectionNumber === activeSection ? null : sectionNumber);
  };

  return (
    <div className="page-container">
      <Link to="/" className="back-button">← Back to Dashboard</Link>
      <h1 className="page-title">Customers & Issues Reported</h1>
      
      <div className="menu-options">
        <div 
          className={`menu-option ${activeSection === 1 ? 'active' : ''}`}
          onClick={() => handleSectionClick(1)}
        >
          <h3>View all customers</h3>
          {activeSection === 1 && (
            <div className="section-content">
              <p>Customer list would appear here</p>
            </div>
          )}
        </div>

        <div 
          className={`menu-option ${activeSection === 2 ? 'active' : ''}`}
          onClick={() => handleSectionClick(2)}
        >
          <h3>View all issues</h3>
          {activeSection === 2 && (
            <div className="section-content">
              <p>Issues list would appear here</p>
            </div>
          )}
        </div>

        <div 
          className={`menu-option ${activeSection === 3 ? 'active' : ''}`}
          onClick={() => handleSectionClick(3)}
        >
          <h3>View issues reported by a specific customer</h3>
          {activeSection === 3 && (
            <div className="section-content">
              <p>Customer-specific issues would appear here</p>
            </div>
          )}
        </div>

        <div 
          className={`menu-option ${activeSection === 4 ? 'active' : ''}`}
          onClick={() => handleSectionClick(4)}
        >
          <h3>Search customer by name</h3>
          {activeSection === 4 && (
            <div className="section-content">
              <p>Customer search interface would appear here</p>
            </div>
          )}
        </div>

        <div 
          className={`menu-option ${activeSection === 5 ? 'active' : ''}`}
          onClick={() => handleSectionClick(5)}
        >
          <h3>Compose Issue on Behalf of Customer</h3>
          {activeSection === 5 && (
            <div className="section-content">
              <p>Issue composition form would appear here</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomerPage;
