import { useState } from 'react';
import { Link } from 'react-router-dom';
import RoleList from '../components/RoleList';
import RoleForm from '../components/RoleForm';
import DepartmentList from '../components/DepartmentList';
import DepartmentForm from '../components/DepartmentForm';
import type { Role, Department } from '../types';

interface RolePageProps {
  refreshData?: () => void;
}

const RolePage: React.FC<RolePageProps> = ({ refreshData = () => {} }) => {
  const [activeSection, setActiveSection] = useState<number | null>(null);
  const [showRoleForm, setShowRoleForm] = useState(false);
  const [showDeptForm, setShowDeptForm] = useState(false);
  const [editingRole, setEditingRole] = useState<Role | null>(null);
  const [editingDepartment, setEditingDepartment] = useState<Department | null>(null);
  const [departments] = useState<Department[]>([]);

  const handleSectionClick = (sectionNumber: number) => {
    setActiveSection(sectionNumber === activeSection ? null : sectionNumber);
    setShowRoleForm(false);
    setShowDeptForm(false);
  };

  const handleEditRole = (role: Role) => {
    setEditingRole(role);
    setShowRoleForm(true);
  };

  const handleEditDepartment = (department: Department) => {
    setEditingDepartment(department);
    setShowDeptForm(true);
  };

  const handleFormSuccess = () => {
    setShowRoleForm(false);
    setShowDeptForm(false);
    setEditingRole(null);
    setEditingDepartment(null);
    refreshData();
  };

  const handleFormCancel = () => {
    setShowRoleForm(false);
    setShowDeptForm(false);
    setEditingRole(null);
    setEditingDepartment(null);
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
            <div className="section-content" onClick={(e) => e.stopPropagation()}>
              {!showRoleForm ? (
                <RoleList onEdit={handleEditRole} refresh={false} departments={departments} />
              ) : (
                <RoleForm 
                  role={editingRole}
                  departments={departments}
                  onSuccess={handleFormSuccess}
                  onCancel={handleFormCancel}
                />
              )}
            </div>
          )}
        </div>

        <div 
          className={`menu-option ${activeSection === 2 ? 'active' : ''}`}
          onClick={() => handleSectionClick(2)}
        >
          <h3>Add new role</h3>
          {activeSection === 2 && (
            <div className="section-content" onClick={(e) => e.stopPropagation()}>
              <RoleForm 
                role={null}
                departments={departments}
                onSuccess={handleFormSuccess}
                onCancel={handleFormCancel}
              />
            </div>
          )}
        </div>

        <div 
          className={`menu-option ${activeSection === 3 ? 'active' : ''}`}
          onClick={() => handleSectionClick(3)}
        >
          <h3>View department structure</h3>
          {activeSection === 3 && (
            <div className="section-content" onClick={(e) => e.stopPropagation()}>
              {!showDeptForm ? (
                <DepartmentList onEdit={handleEditDepartment} refresh={false} />
              ) : (
                <DepartmentForm 
                  department={editingDepartment}
                  onSuccess={handleFormSuccess}
                  onCancel={handleFormCancel}
                />
              )}
            </div>
          )}
        </div>

        <div 
          className={`menu-option ${activeSection === 4 ? 'active' : ''}`}
          onClick={() => handleSectionClick(4)}
        >
          <h3>Add new department</h3>
          {activeSection === 4 && (
            <div className="section-content" onClick={(e) => e.stopPropagation()}>
              <DepartmentForm 
                department={null}
                onSuccess={handleFormSuccess}
                onCancel={handleFormCancel}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RolePage;
