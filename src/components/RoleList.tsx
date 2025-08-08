import React, { useState, useEffect } from 'react';
import type { Role, Department } from '../types';
import { roleService } from '../services/roleService';

interface RoleProperties {onEdit: (role: Role) => void; refresh: boolean; departments: Department[];}

const RoleList: React.FC<RoleProperties> = ({ onEdit, refresh, departments }) => {
  const [roles, setRoles] = useState<Role[]>([]);

  // hrmmm
  useEffect(() => {loadRoles();}, [refresh]);


  // watchu du
  const loadRoles = async () => {
    try {
      const data = await roleService.getAllRoles();
      setRoles(data);
    }
    catch (err) {console.error(err);}
  };


  // ur position been terminated lil bro
  const handleDelete = async (id: number) => {
    if (window.confirm('DELETE THIS ROLE?')) {
      try {
        await roleService.deleteRole(id);
        setRoles(roles.filter(role => role.id !== id));
      }
      catch (err) {console.error(err);}
    }
  };

  const getDepartmentName = (departmentID: number) => {
    const dept = departments.find(d => d.id === departmentID);
    return dept ? dept.departmentName : 'Unknown';
  };


  // table
  return (
    <div>
      {/* title */}
      <h2>ROLES ({roles.length})</h2>
      
      {/* table */}
      <table border={1}>
        <thead>
          <tr>
            <th>DEPARTMENT</th>
            <th>ROLE NAME</th>
            <th>DESCRIPTION</th>
            <th>ACTIONS</th>
          </tr>
        </thead>
        
        <tbody>
          {roles.length === 0 && (
            <tr>
              <td colSpan={4}>NO ROLES FOUND</td>
            </tr>
          )}
          {roles.length > 0 && roles.map((role) => (
            <tr key={role.id}>
              <td>{getDepartmentName(role.departmentID)}</td>
              <td>{role.roleName}</td>
              <td>{role.description}</td>
              <td>
                <button onClick={() => onEdit(role)}>EDIT</button>
                <button onClick={() => handleDelete(role.id)}>DELETE</button>
              </td>
            </tr>
          ))}
        </tbody>
      
      </table>
    </div>
  );
};

export default RoleList;
