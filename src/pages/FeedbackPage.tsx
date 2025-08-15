import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import FeedbackList from '../components/FeedbackList';
import FeedbackForm from '../components/FeedbackForm';
import type { Customer, Issue, Feedback } from '../types';

interface FeedbackPageProps {
  customers: Customer[];
  issues: Issue[];
  refreshData: () => void;
}

const FeedbackPage: React.FC<FeedbackPageProps> = ({ customers, issues, refreshData }) => {
  const [activeSection, setActiveSection] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingFeedback, setEditingFeedback] = useState<Feedback | null>(null);

  const handleSectionClick = (sectionNumber: number) => {
    setActiveSection(sectionNumber === activeSection ? null : sectionNumber);
    setShowForm(false);
  };

  const handleEditFeedback = (feedback: Feedback) => {
    setEditingFeedback(feedback);
    setShowForm(true);
    // Keep the section expanded
  };

  const handleFormSuccess = () => {
    setShowForm(false);
    setEditingFeedback(null);
    refreshData();
    // Keep the section expanded
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingFeedback(null);
    // Keep the section expanded
  };

  return (
    <div className="page-container">
      <Link to="/" className="back-button">← Back to Dashboard</Link>
      <h1 className="page-title">Customer Feedback Management</h1>
      
      <div className="menu-options">
        <div 
          className={`menu-option ${activeSection === 1 ? 'active' : ''}`}
          onClick={() => handleSectionClick(1)}
        >
          <h3>View all feedback</h3>
          <AnimatePresence>
            {activeSection === 1 && (
              <motion.div 
                className="section-content" 
                onClick={(e) => e.stopPropagation()}
                initial={{ height: 0, opacity: 0, y: -10 }}
                animate={{ height: "auto", opacity: 1, y: 0 }}
                exit={{ height: 0, opacity: 0, y: -10 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                {!showForm ? (
                  <FeedbackList 
                    onEdit={handleEditFeedback} 
                    refresh={false} 
                    customers={customers}
                    issues={issues}
                  />
                ) : (
                  <FeedbackForm
                    feedback={editingFeedback}
                    customers={customers}
                    issues={issues}
                    onSuccess={handleFormSuccess}
                    onCancel={handleFormCancel}
                  />
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div 
          className={`menu-option ${activeSection === 2 ? 'active' : ''}`}
          onClick={() => handleSectionClick(2)}
        >
          <h3>Submit new feedback</h3>
          <AnimatePresence>
            {activeSection === 2 && (
              <motion.div 
                className="section-content" 
                onClick={(e) => e.stopPropagation()}
                initial={{ height: 0, opacity: 0, y: -10 }}
                animate={{ height: "auto", opacity: 1, y: 0 }}
                exit={{ height: 0, opacity: 0, y: -10 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <FeedbackForm
                  feedback={null}
                  customers={customers}
                  issues={issues}
                  onSuccess={handleFormSuccess}
                  onCancel={handleFormCancel}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default FeedbackPage;
