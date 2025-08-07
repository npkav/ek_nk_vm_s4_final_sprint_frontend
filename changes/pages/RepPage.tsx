import { useState } from 'react';
import { Link } from 'react-router-dom';

const RepPage = () => {
  const [activeSection, setActiveSection] = useState<number | null>(null);

  const handleSectionClick = (sectionNumber: number) => {
    setActiveSection(sectionNumber === activeSection ? null : sectionNumber);
  };

  return (
    <div className="page-container">
      <Link to="/" className="back-button">← Back to Dashboard</Link>
      <h1 className="page-title">Reps & Assigned Issues</h1>
      
      <div className="menu-options">
        <div 
          className={`menu-option ${activeSection === 1 ? 'active' : ''}`}
          onClick={() => handleSectionClick(1)}
        >
          <h3>View all service reps</h3>
          {activeSection === 1 && (
            <div className="section-content">
              <p>Service reps list would appear here</p>
            </div>
          )}
        </div>

        <div 
          className={`menu-option ${activeSection === 2 ? 'active' : ''}`}
          onClick={() => handleSectionClick(2)}
        >
          <h3>View all issues assigned to a specific rep</h3>
          {activeSection === 2 && (
            <div className="section-content">
              <p>Rep-specific issues would appear here</p>
            </div>
          )}
        </div>

        <div 
          className={`menu-option ${activeSection === 3 ? 'active' : ''}`}
          onClick={() => handleSectionClick(3)}
        >
          <h3>Filter reps by department/role</h3>
          {activeSection === 3 && (
            <div className="section-content">
              <p>Department/role filtered reps would appear here</p>
            </div>
          )}
        </div>

        <div 
          className={`menu-option ${activeSection === 4 ? 'active' : ''}`}
          onClick={() => handleSectionClick(4)}
        >
          <h3>Search rep by name</h3>
          {activeSection === 4 && (
            <div className="section-content">
              <p>Rep search interface would appear here</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RepPage;
