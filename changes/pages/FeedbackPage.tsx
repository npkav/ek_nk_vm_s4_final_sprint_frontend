import { useState } from 'react';
import { Link } from 'react-router-dom';

const FeedbackPage = () => {
  const [activeSection, setActiveSection] = useState<number | null>(null);

  const handleSectionClick = (sectionNumber: number) => {
    setActiveSection(sectionNumber === activeSection ? null : sectionNumber);
  };

  return (
    <div className="page-container">
      <Link to="/" className="back-button">← Back to Dashboard</Link>
      <h1 className="page-title">Customer Feedback & Ratings</h1>
      
      <div className="menu-options">
        <div 
          className={`menu-option ${activeSection === 1 ? 'active' : ''}`}
          onClick={() => handleSectionClick(1)}
        >
          <h3>View all feedback entries</h3>
          {activeSection === 1 && (
            <div className="section-content">
              <p>Feedback entries would appear here</p>
            </div>
          )}
        </div>

        <div 
          className={`menu-option ${activeSection === 2 ? 'active' : ''}`}
          onClick={() => handleSectionClick(2)}
        >
          <h3>View ratings for a specific rep</h3>
          {activeSection === 2 && (
            <div className="section-content">
              <p>Rep-specific ratings would appear here</p>
            </div>
          )}
        </div>

        <div 
          className={`menu-option ${activeSection === 3 ? 'active' : ''}`}
          onClick={() => handleSectionClick(3)}
        >
          <h3>View average score for a specific rep</h3>
          {activeSection === 3 && (
            <div className="section-content">
              <p>Average score calculations would appear here</p>
            </div>
          )}
        </div>

        <div 
          className={`menu-option ${activeSection === 4 ? 'active' : ''}`}
          onClick={() => handleSectionClick(4)}
        >
          <h3>Filter feedback by rating (1-5)</h3>
          {activeSection === 4 && (
            <div className="section-content">
              <p>Filtered feedback would appear here</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FeedbackPage;
