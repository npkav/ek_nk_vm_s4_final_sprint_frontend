import { useState } from 'react';
import { Link } from 'react-router-dom';
import ServiceRepList from '../components/ServiceRepList';
import ServiceRepForm from '../components/ServiceRepForm';
import type { ServiceRep, Role, Department } from '../types';

interface RepPageProps {
  roles?: Role[];
  departments?: Department[];
  refreshData?: () => void;
}

const RepPage: React.FC<RepPageProps> = ({ roles = [], departments = [], refreshData = () => {} }) => {
  const [activeSection, setActiveSection] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingRep, setEditingRep] = useState<ServiceRep | null>(null);

  const handleSectionClick = (sectionNumber: number) => {
    setActiveSection(sectionNumber === activeSection ? null : sectionNumber);
    setShowForm(false);
  };

  const handleEditRep = (rep: ServiceRep) => {
    setEditingRep(rep);
    setShowForm(true);
  };

  const handleFormSuccess = () => {
    setShowForm(false);
    setEditingRep(null);
    refreshData();
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingRep(null);
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
              {!showForm ? (
                <ServiceRepList 
                  onEdit={handleEditRep} 
                  refresh={false} 
                  departments={departments}
                  roles={roles}
                />
              ) : (
                <ServiceRepForm 
                  serviceRep={editingRep}
                  roles={roles}
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
          <h3>Add new representative</h3>
          {activeSection === 2 && (
            <div className="section-content" onClick={(e) => e.stopPropagation()}>
              <ServiceRepForm 
                serviceRep={null}
                roles={roles}
                departments={departments}
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

export default RepPage;
