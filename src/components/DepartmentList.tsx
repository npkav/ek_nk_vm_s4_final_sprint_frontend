import React, { useState, useEffect } from 'react';
import type { Department } from '../types';
import { departmentService } from '../services/departmentService';

interface DepartmentProperties {onEdit: (department: Department) => void; refresh: boolean;}

const DepartmentList: React.FC<DepartmentProperties> = ({ onEdit, refresh }) => {
  const [departments, setDepartments] = useState<Department[]>([]);

  // hrmmm
  useEffect(() => {loadDepartments();}, [refresh]);


  // dept loading time
  const loadDepartments = async () => {
    try {
      const data = await departmentService.getAllDepartments();
      setDepartments(data);
    }
    catch (err) {console.error(err);}
  };


  // goodbye dept
  const handleDelete = async (id: number) => {
    if (window.confirm('DELETE THIS DEPARTMENT?')) {
      try {
        await departmentService.deleteDepartment(id);
        setDepartments(departments.filter(dept => dept.id !== id));
      }
      catch (err) {console.error(err);}
    }
  };


  // table
  return (
    <div>
      {/* title */}
      <h2>DEPARTMENTS ({departments.length})</h2>
      
      {/* table */}
      <table border={1}>
        <thead>
          <tr>
            <th>DEPARTMENT NAME</th>
            <th>DESCRIPTION</th>
            <th>ACTIONS</th>
          </tr>
        </thead>
        
        <tbody>
          {departments.length === 0 && (
            <tr>
              <td colSpan={3}>NO DEPARTMENTS FOUND</td>
            </tr>
          )}
          {departments.length > 0 && departments.map((department) => (
            <tr key={department.id}>
              <td>{department.departmentName}</td>
              <td>{department.description}</td>
              <td>
                <button onClick={() => onEdit(department)}>EDIT</button>
                <button onClick={() => handleDelete(department.id)}>DELETE</button>
              </td>
            </tr>
          ))}
        </tbody>
      
      </table>
    </div>
  );
};

export default DepartmentList;
