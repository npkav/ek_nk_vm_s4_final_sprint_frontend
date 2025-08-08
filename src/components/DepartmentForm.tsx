import React, { useState } from 'react';
import type { Department } from '../types';
import { departmentService } from '../services/departmentService';

interface DepartmentProperties {
  department?: Department | null;
  onSuccess: () => void;
  onCancel: () => void;
}

const DepartmentForm: React.FC<DepartmentProperties> = ({ department, onSuccess, onCancel }) => {
  const [departmentName, setDepartmentName] = useState(department?.departmentName || '');
  const [description, setDescription] = useState(department?.description || '');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = { departmentName, description };
      if (department) {await departmentService.updateDepartment(department.id, data);}
      else {await departmentService.createDepartment(data);}
      onSuccess();
    }
    catch (err) {console.error(err);}
    finally {setLoading(false);}
  };

  return (
    <fieldset>
      <legend>{department ? 'EDIT DEPARTMENT' : 'ADD DEPARTMENT'}</legend>
      <form onSubmit={handleSubmit}>
        <div>
          <label>DEPARTMENT NAME</label><br/>
          <input
            type="text"
            value={departmentName}
            onChange={(input) => setDepartmentName(input.target.value)}
            placeholder="e.g., Customer Service, Baggage, Operations"
            required
          />
        </div>
        <div>
          <label>DESCRIPTION</label><br/>
          <textarea
            value={description}
            onChange={(input) => setDescription(input.target.value)}
            placeholder="Department responsibilities..."
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

export default DepartmentForm;
