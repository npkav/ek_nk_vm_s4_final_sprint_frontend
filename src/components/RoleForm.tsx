import React, { useState } from 'react';
import type { Role, Department } from '../types';
import { roleService } from '../services/roleService';

interface RoleProperties {
  role?: Role | null;
  departments: Department[];
  onSuccess: () => void;
  onCancel: () => void;
}

const RoleForm: React.FC<RoleProperties> = ({ role, departments, onSuccess, onCancel }) => {
  const [roleName, setRoleName] = useState(role?.roleName || '');
  const [description, setDescription] = useState(role?.description || '');
  const [departmentID, setDepartmentID] = useState(role?.departmentID || 0);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = { roleName, description, departmentID };
      if (role) {await roleService.updateRole(role.id, data);}
      else {await roleService.createRole(data);}
      onSuccess();
    }
    catch (err) {console.error(err);}
    finally {setLoading(false);}
  };

  return (
    <fieldset>
      <legend>{role ? 'EDIT ROLE' : 'ADD ROLE'}</legend>
      <form onSubmit={handleSubmit}>
        <div>
          <label>DEPARTMENT</label><br/>
          <select
            value={departmentID}
            onChange={(e) => setDepartmentID(Number(e.target.value))}
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
          <label>ROLE NAME</label><br/>
          <input
            type="text"
            value={roleName}
            onChange={(input) => setRoleName(input.target.value)}
            placeholder="e.g., Manager, Agent, Supervisor"
            required
          />
        </div>
        <div>
          <label>DESCRIPTION</label><br/>
          <textarea
            value={description}
            onChange={(input) => setDescription(input.target.value)}
            placeholder="Role responsibilities..."
            rows={3}
            required
          />
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

export default RoleForm;
