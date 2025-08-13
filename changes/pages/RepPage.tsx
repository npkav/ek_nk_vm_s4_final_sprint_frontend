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
      <h1 className="page-title">Service Representatives</h1>
      
      <div className="menu-options">
        <div 
          className={`menu-option ${activeSection === 1 ? 'active' : ''}`}
          onClick={() => handleSectionClick(1)}
        >
          <h3>View all representatives</h3>
          {activeSection === 1 && (
            <div className="section-content" onClick={(e) => e.stopPropagation()}>
              {/* Representatives list implementation will go here */}
            </div>
          )}
        </div>

        <div 
          className={`menu-option ${activeSection === 2 ? 'active' : ''}`}
          onClick={() => handleSectionClick(2)}
        >
          <h3>Add new representative</h3>
          {activeSection === 2 && (
            <div className="section-content" onClick={(e) => e.stopPropagation()}>
              {/* Representative form implementation will go here */}
            </div>
          )}
        </div>

        <div 
          className={`menu-option ${activeSection === 3 ? 'active' : ''}`}
          onClick={() => handleSectionClick(3)}
        >
          <h3>View representative performance</h3>
          {activeSection === 3 && (
            <div className="section-content" onClick={(e) => e.stopPropagation()}>
              {/* Performance metrics implementation will go here */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RepPage;