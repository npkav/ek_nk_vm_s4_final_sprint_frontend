import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import CustomerList from '../components/CustomerList';
import CustomerForm from '../components/CustomerForm';
import IssueList from '../components/IssueList';
import IssueForm from '../components/IssueForm';
import type { Customer, Issue } from '../types';

interface CustomerPageProps {
  customers: Customer[];
  refreshData: () => void;
}

const CustomerPage: React.FC<CustomerPageProps> = ({ customers, refreshData }) => {
  const [activeSection, setActiveSection] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
  const [editingIssue, setEditingIssue] = useState<Issue | null>(null);
  const [showIssueForm, setShowIssueForm] = useState(false);

  const handleSectionClick = (sectionNumber: number) => {
    setActiveSection(sectionNumber === activeSection ? null : sectionNumber);
    setShowForm(false);
    setShowIssueForm(false);
  };

  const handleEditCustomer = (customer: Customer) => {
    setEditingCustomer(customer);
    setShowForm(true);
    // Keep the section expanded
  };

  const handleEditIssue = (issue: Issue) => {
    setEditingIssue(issue);
    setShowIssueForm(true);
    // Keep the section expanded
  };

  const handleFormSuccess = () => {
    setShowForm(false);
    setShowIssueForm(false);
    setEditingCustomer(null);
    setEditingIssue(null);
    refreshData();
    // Keep the section expanded
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setShowIssueForm(false);
    setEditingCustomer(null);
    setEditingIssue(null);
    // Keep the section expanded
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
                  <CustomerList onEdit={handleEditCustomer} refresh={false} />
                ) : (
                  <CustomerForm 
                    customer={editingCustomer}
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
          <h3>View all issues</h3>
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
                {!showIssueForm ? (
                  <IssueList 
                    onEdit={handleEditIssue} 
                    refresh={false} 
                    customers={customers}
                  />
                ) : (
                  <IssueForm
                    issue={editingIssue}
                    customers={customers}
                    onSuccess={handleFormSuccess}
                    onCancel={handleFormCancel}
                  />
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div 
          className={`menu-option ${activeSection === 3 ? 'active' : ''}`}
          onClick={() => handleSectionClick(3)}
        >
          <h3>Report new issue for a customer</h3>
          <AnimatePresence>
            {activeSection === 3 && (
              <motion.div 
                className="section-content" 
                onClick={(e) => e.stopPropagation()}
                initial={{ height: 0, opacity: 0, y: -10 }}
                animate={{ height: "auto", opacity: 1, y: 0 }}
                exit={{ height: 0, opacity: 0, y: -10 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <IssueForm
                  issue={null}
                  customers={customers}
                  onSuccess={handleFormSuccess}
                  onCancel={handleFormCancel}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div 
          className={`menu-option ${activeSection === 4 ? 'active' : ''}`}
          onClick={() => handleSectionClick(4)}
        >
          <h3>Add new customer</h3>
          <AnimatePresence>
            {activeSection === 4 && (
              <motion.div 
                className="section-content" 
                onClick={(e) => e.stopPropagation()}
                initial={{ height: 0, opacity: 0, y: -10 }}
                animate={{ height: "auto", opacity: 1, y: 0 }}
                exit={{ height: 0, opacity: 0, y: -10 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <CustomerForm
                  customer={null}
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

export default CustomerPage;
