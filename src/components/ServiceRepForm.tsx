import React, { useState } from 'react';
import type { ServiceRep, Department, Role } from '../types';
import { serviceRepService } from '../services/serviceRepService';

interface ServiceRepProperties {
  serviceRep?: ServiceRep | null;
  departments: Department[];
  roles: Role[];
  onSuccess: () => void;
  onCancel: () => void;
}

const ServiceRepForm: React.FC<ServiceRepProperties> = ({ 
  serviceRep, 
  departments, 
  roles, 
  onSuccess, 
  onCancel 
}) => {
  const [firstName, setFirstName] = useState(serviceRep?.firstName || '');
  const [lastName, setLastName] = useState(serviceRep?.lastName || '');
  const [email, setEmail] = useState(serviceRep?.email || '');
  const [departmentID, setDepartmentID] = useState(typeof serviceRep?.departmentID === 'object' ? serviceRep.departmentID.id : (serviceRep?.departmentID || 0));
  const [roleID, setRoleID] = useState(typeof serviceRep?.roleID === 'object' ? serviceRep.roleID.id : (serviceRep?.roleID || 0));
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = { firstName, lastName, email, departmentID, roleID };
      if (serviceRep) {await serviceRepService.updateServiceRep(serviceRep.id, data);}
      else {await serviceRepService.createServiceRep(data);}
      onSuccess();
    }
    catch (err) {console.error(err);}
    finally {setLoading(false);}
  };

  const getAvailableRoles = () => {
    return roles.filter(role => role.departmentID === departmentID);
  };

  return (
    <fieldset>
      <legend>{serviceRep ? 'EDIT SERVICE REP' : 'ADD SERVICE REP'}</legend>
      <form onSubmit={handleSubmit}>
        <div>
          <label>FIRST NAME</label><br/>
          <input
            type="text"
            value={firstName}
            onChange={(input) => setFirstName(input.target.value)}
            required
          />
        </div>
        <div>
          <label>LAST NAME</label><br/>
          <input
            type="text"
            value={lastName}
            onChange={(input) => setLastName(input.target.value)}
            required
          />
        </div>
        <div>
          <label>EMAIL</label><br/>
          <input
            type="email"
            value={email}
            onChange={(input) => setEmail(input.target.value)}
            required
          />
        </div>
        <div>
          <label>DEPARTMENT</label><br/>
          <select
            value={departmentID}
            onChange={(e) => {
              setDepartmentID(Number(e.target.value));
              setRoleID(0);
            }}
            required
          >
            <option value={0}>SELECT DEPARTMENT</option>
            {departments.map(dept => (
              <option key={dept.id} value={dept.id}>
                {dept.departmentName}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>ROLE</label><br/>
          <select
            value={roleID}
            onChange={(e) => setRoleID(Number(e.target.value))}
            required
            disabled={!departmentID}
          >
            <option value={0}>SELECT ROLE</option>
            {getAvailableRoles().map(role => (
              <option key={role.id} value={role.id}>
                {role.roleName}
              </option>
            ))}
          </select>
        </div>
        <div>
          <button type="button" onClick={onCancel}>CANCEL</button>
          <button type="submit" disabled={loading}>
            {loading && 'SAVING...'}
            {!loading && 'SAVE'}
          </button>
        </div>
      </form>
    </fieldset>
  );
};

export default ServiceRepForm;
