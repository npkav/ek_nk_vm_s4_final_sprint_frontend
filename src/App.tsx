import { useState, useEffect } from 'react';
import CustomerList from './components/CustomerList';
import CustomerForm from './components/CustomerForm';
import IssueList from './components/IssueList';
import IssueForm from './components/IssueForm';
import FeedbackList from './components/FeedbackList';
import FeedbackForm from './components/FeedbackForm';
import type { Customer, Issue, Feedback } from './types';
import { customerService } from './services/customerService';
import { issueService } from './services/issueService';

function App() {
  const [activeTab, setActiveTab] = useState<'customers' | 'issues' | 'feedback'>('customers');
  const [showForm, setShowForm] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
  const [editingIssue, setEditingIssue] = useState<Issue | null>(null);
  const [editingFeedback, setEditingFeedback] = useState<Feedback | null>(null);
  const [refresh, setRefresh] = useState(0);
  
  // dropdown data shii
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [issues, setIssues] = useState<Issue[]>([]);

  useEffect(() => {loadInitialData();}, []);


  const loadInitialData = async () => {
    try {
      const [customersData, issuesData] = await Promise.all([customerService.getAllCustomers(), issueService.getAllIssues()]);
      setCustomers(customersData);
      setIssues(issuesData);
    } catch (err) {console.error('Failed to load initial data:', err);}
  };

  const handleAddNew = () => {
    setEditingCustomer(null);
    setEditingIssue(null);
    setEditingFeedback(null);
    setShowForm(true);
  };

  const handleEditCustomer = (customer: Customer) => {
    setEditingCustomer(customer);
    setShowForm(true);
  };

  const handleEditIssue = (issue: Issue) => {
    setEditingIssue(issue);
    setShowForm(true);
  };

  const handleEditFeedback = (feedback: Feedback) => {
    setEditingFeedback(feedback);
    setShowForm(true);
  };

  const handleFormSuccess = () => {
    setShowForm(false);
    setEditingCustomer(null);
    setEditingIssue(null);
    setEditingFeedback(null);
    setRefresh(refresh + 1);
    loadInitialData();
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingCustomer(null);
    setEditingIssue(null);
    setEditingFeedback(null);
  };

  const getTabTitle = () => {
    switch (activeTab) {
      case 'customers': return 'Customer Management';
      case 'issues': return 'Travel Issues';
      case 'feedback': return 'Customer Feedback';
      default: return 'Air Travel Feedback System';
    }
  };

  const getAddButtonText = () => {
    switch (activeTab) {
      case 'customers': return 'Add New Customer';
      case 'issues': return 'Report New Issue';
      case 'feedback': return 'Submit Feedback';
      default: return 'Add New';
    }
  };

  return (
    <div>
      <header>
        <h1>AIR TRAVEL FEEDBACK SYSTEM</h1>
        <nav>
          <button 
            onClick={() => setActiveTab('customers')}
            style={{ backgroundColor: activeTab === 'customers' ? '#fff' : '' }}
          >
            CUSTOMERS
          </button>
          <button 
            onClick={() => setActiveTab('issues')}
            style={{ backgroundColor: activeTab === 'issues' ? '#fff' : '' }}
          >
            ISSUES
          </button>
          <button 
            onClick={() => setActiveTab('feedback')}
            style={{ backgroundColor: activeTab === 'feedback' ? '#fff' : '' }}
          >
            FEEDBACK
          </button>
        </nav>
        <h2>{getTabTitle()}</h2>
        {!showForm && (
          <button onClick={handleAddNew}>{getAddButtonText()}</button>
        )}
      </header>

      <main>
        {!showForm ? (
          <>
            {activeTab === 'customers' && (
              <CustomerList
                onEdit={handleEditCustomer}
                refresh={refresh > 0}
              />
            )}
            {activeTab === 'issues' && (
              <IssueList
                onEdit={handleEditIssue}
                refresh={refresh > 0}
                customers={customers}
              />
            )}
            {activeTab === 'feedback' && (
              <FeedbackList
                onEdit={handleEditFeedback}
                refresh={refresh > 0}
                customers={customers}
                issues={issues}
              />
            )}
          </>
        ) : (
          <>
            {activeTab === 'customers' && (
              <CustomerForm
                customer={editingCustomer}
                onSuccess={handleFormSuccess}
                onCancel={handleFormCancel}
              />
            )}
            {activeTab === 'issues' && (
              <IssueForm
                issue={editingIssue}
                customers={customers}
                onSuccess={handleFormSuccess}
                onCancel={handleFormCancel}
              />
            )}
            {activeTab === 'feedback' && (
              <FeedbackForm
                feedback={editingFeedback}
                customers={customers}
                issues={issues}
                onSuccess={handleFormSuccess}
                onCancel={handleFormCancel}
              />
            )}
          </>
        )}
      </main>

      <footer>
        <p>EK/NK/VM - FINAL SPRINT - SD12 - Air Travel Feedback Management System</p>
      </footer>
    </div>
  );
}

export default App;