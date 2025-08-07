import { useState } from 'react';
import { Link } from 'react-router-dom';

const RolePage = () => {
  const [activeSection, setActiveSection] = useState<number | null>(null);

  const handleSectionClick = (sectionNumber: number) => {
    setActiveSection(sectionNumber === activeSection ? null : sectionNumber);
  };

  return (
    <div className="page-container">
      <Link to="/" className="back-button">← Back to Dashboard</Link>
      <h1 className="page-title">Roles & Departments</h1>
      
      <div className="menu-options">
        <div 
          className={`menu-option ${activeSection === 1 ? 'active' : ''}`}
          onClick={() => handleSectionClick(1)}
        >
          <h3>View all roles</h3>
          {activeSection === 1 && (
            <div className="section-content">
              <p>Roles list would appear here</p>
            </div>
          )}
        </div>

        <div 
          className={`menu-option ${activeSection === 2 ? 'active' : ''}`}
          onClick={() => handleSectionClick(2)}
        >
          <h3>View all departments</h3>
          {activeSection === 2 && (
            <div className="section-content">
              <p>Departments list would appear here</p>
            </div>
          )}
        </div>

        <div 
          className={`menu-option ${activeSection === 3 ? 'active' : ''}`}
          onClick={() => handleSectionClick(3)}
        >
          <h3>View all reps under a specific role</h3>
          {activeSection === 3 && (
            <div className="section-content">
              <p>Role-specific reps would appear here</p>
            </div>
          )}
        </div>

        <div 
          className={`menu-option ${activeSection === 4 ? 'active' : ''}`}
          onClick={() => handleSectionClick(4)}
        >
          <h3>View all reps under a specific department</h3>
          {activeSection === 4 && (
            <div className="section-content">
              <p>Department-specific reps would appear here</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RolePage;
