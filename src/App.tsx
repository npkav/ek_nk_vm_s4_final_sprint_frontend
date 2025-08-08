import { useState, useEffect } from 'react';
import CustomerList from './components/CustomerList';
import CustomerForm from './components/CustomerForm';
import IssueList from './components/IssueList';
import IssueForm from './components/IssueForm';
import FeedbackList from './components/FeedbackList';
import FeedbackForm from './components/FeedbackForm';
import DepartmentList from './components/DepartmentList';
import DepartmentForm from './components/DepartmentForm';
import RoleList from './components/RoleList';
import RoleForm from './components/RoleForm';
import ServiceRepList from './components/ServiceRepList';
import ServiceRepForm from './components/ServiceRepForm';
import type { Customer, Issue, Feedback, Department, Role, ServiceRep } from './types';
import { customerService } from './services/customerService';
import { issueService } from './services/issueService';
import { departmentService } from './services/departmentService';
import { roleService } from './services/roleService';


function App() {
  const [activeTab, setActiveTab] = useState<'customers' | 'issues' | 'feedback' | 'departments' | 'roles' | 'servicereps'>('customers');
  const [showForm, setShowForm] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
  const [editingIssue, setEditingIssue] = useState<Issue | null>(null);
  const [editingFeedback, setEditingFeedback] = useState<Feedback | null>(null);
  const [editingDepartment, setEditingDepartment] = useState<Department | null>(null);
  const [editingRole, setEditingRole] = useState<Role | null>(null);
  const [editingServiceRep, setEditingServiceRep] = useState<ServiceRep | null>(null);
  const [refresh, setRefresh] = useState(0);
  
  // dropdown data shii
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [issues, setIssues] = useState<Issue[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);


  useEffect(() => {loadInitialData();}, []);


  const loadInitialData = async () => {
    try {
      const [customersData, issuesData, departmentsData, rolesData] = await Promise.all([
        customerService.getAllCustomers(), 
        issueService.getAllIssues(),
        departmentService.getAllDepartments(),
        roleService.getAllRoles(),
      ]);
      setCustomers(customersData);
      setIssues(issuesData);
      setDepartments(departmentsData);
      setRoles(rolesData);
    } catch (err) {console.error('Failed to load initial data:', err);}
  };

  const handleAddNew = () => {
    setEditingCustomer(null);
    setEditingIssue(null);
    setEditingFeedback(null);
    setEditingDepartment(null);
    setEditingRole(null);
    setEditingServiceRep(null);
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

  const handleEditDepartment = (department: Department) => {
    setEditingDepartment(department);
    setShowForm(true);
  };

  const handleEditRole = (role: Role) => {
    setEditingRole(role);
    setShowForm(true);
  };

  const handleEditServiceRep = (serviceRep: ServiceRep) => {
    setEditingServiceRep(serviceRep);
    setShowForm(true);
  };

  const handleFormSuccess = () => {
    setShowForm(false);
    setEditingCustomer(null);
    setEditingIssue(null);
    setEditingFeedback(null);
    setEditingDepartment(null);
    setEditingRole(null);
    setEditingServiceRep(null);
    setRefresh(refresh + 1);
    loadInitialData();
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingCustomer(null);
    setEditingIssue(null);
    setEditingFeedback(null);
    setEditingDepartment(null);
    setEditingRole(null);
    setEditingServiceRep(null);
  };

  const getTabTitle = () => {
    switch (activeTab) {
      case 'customers': return 'Customer Management';
      case 'issues': return 'Travel Issues';
      case 'feedback': return 'Customer Feedback';
      case 'departments': return 'Department Management';
      case 'roles': return 'Role Management';
      case 'servicereps': return 'Service Representatives';
      default: return 'Air Travel Feedback System';
    }
  };

  const getAddButtonText = () => {
    switch (activeTab) {
      case 'customers': return 'Add New Customer';
      case 'issues': return 'Report New Issue';
      case 'feedback': return 'Submit Feedback';
      case 'departments': return 'Add New Department';
      case 'roles': return 'Add New Role';
      case 'servicereps': return 'Add New Service Rep';
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
          <button 
            onClick={() => setActiveTab('departments')}
            style={{ backgroundColor: activeTab === 'departments' ? '#fff' : '' }}
          >
            DEPARTMENTS
          </button>
          <button 
            onClick={() => setActiveTab('roles')}
            style={{ backgroundColor: activeTab === 'roles' ? '#fff' : '' }}
          >
            ROLES
          </button>
          <button 
            onClick={() => setActiveTab('servicereps')}
            style={{ backgroundColor: activeTab === 'servicereps' ? '#fff' : '' }}
          >
            SERVICE REPS
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
            {activeTab === 'departments' && (
              <DepartmentList
                onEdit={handleEditDepartment}
                refresh={refresh > 0}
              />
            )}
            {activeTab === 'roles' && (
              <RoleList
                onEdit={handleEditRole}
                refresh={refresh > 0}
                departments={departments}
              />
            )}
            {activeTab === 'servicereps' && (
              <ServiceRepList
                onEdit={handleEditServiceRep}
                refresh={refresh > 0}
                departments={departments}
                roles={roles}
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
            {activeTab === 'departments' && (
              <DepartmentForm
                department={editingDepartment}
                onSuccess={handleFormSuccess}
                onCancel={handleFormCancel}
              />
            )}
            {activeTab === 'roles' && (
              <RoleForm
                role={editingRole}
                departments={departments}
                onSuccess={handleFormSuccess}
                onCancel={handleFormCancel}
              />
            )}
            {activeTab === 'servicereps' && (
              <ServiceRepForm
                serviceRep={editingServiceRep}
                departments={departments}
                roles={roles}
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