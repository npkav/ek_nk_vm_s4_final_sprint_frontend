import React, { useState, useEffect } from 'react';
import type { ServiceRep, Department, Role } from '../types';
import { serviceRepService } from '../services/serviceRepService';

interface ServiceRepProperties {onEdit: (serviceRep: ServiceRep) => void; refresh: boolean; departments: Department[]; roles: Role[];}

const ServiceRepList: React.FC<ServiceRepProperties> = ({ onEdit, refresh, departments, roles }) => {
  const [serviceReps, setServiceReps] = useState<ServiceRep[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDept, setFilterDept] = useState<number>(0);

  // hrmmm
  useEffect(() => {loadServiceReps();}, [refresh]);


  // the homies
  const loadServiceReps = async () => {
    try {
      let data;
      if (searchTerm) {data = await serviceRepService.searchServiceReps(searchTerm);} 
      else {data = await serviceRepService.getAllServiceReps();}
      
      if (filterDept && data) {data = data.filter(rep => {
          const deptId = typeof rep.departmentID === 'object' ? rep.departmentID.id : rep.departmentID;
          return deptId === filterDept;
        });
      }
      
      setServiceReps(data);
    }
    catch (err) {console.error(err);}
  };


  // where u @
  const handleSearch = () => {loadServiceReps();};


  // where u from lil homie
  const handleFilterChange = () => {loadServiceReps();};


  // i wont forget u
  const handleDelete = async (id: number) => {
    if (window.confirm('DELETE THIS SERVICE REP?')) {
      try {
        await serviceRepService.deleteServiceRep(id);
        setServiceReps(serviceReps.filter(rep => rep.id !== id));
      }
      catch (err) {console.error(err);}
    }
  };

  const getDepartmentName = (departmentData: any) => {
    if (typeof departmentData === 'object' && departmentData.departmentName) {return departmentData.departmentName;}
    const dept = departments.find(d => d.id === departmentData); return dept ? dept.departmentName : 'Unknown';
  };

  const getRoleName = (roleData: any) => {
    if (typeof roleData === 'object' && roleData.roleName) {return roleData.roleName;}
    const role = roles.find(r => r.id === roleData);
    return role ? role.roleName : 'Unknown';
  };


  // table (with a french accent)
  return (
    <div>
      <div>
        {/* search bar */}
        <input
          type="text"
          placeholder="SEARCH REPS..."
          value={searchTerm}
          onChange={(input) => setSearchTerm(input.target.value)}
          onKeyPress={(input) => input.key === 'Enter' && handleSearch()}
        />
        <button onClick={handleSearch}>SEARCH</button>
        <button onClick={() => { setSearchTerm(''); loadServiceReps(); }}>CLEAR</button>
        
        {/* filter */}
        <label> FILTER BY DEPT: </label>
        <select 
          value={filterDept} 
          onChange={(e) => setFilterDept(Number(e.target.value))}
        >
          <option value={0}>ALL DEPARTMENTS</option>
          {departments.map(dept => (
            <option key={dept.id} value={dept.id}>
              {dept.departmentName}
            </option>
          ))}
        </select>
        <button onClick={handleFilterChange}>FILTER</button>
        <button onClick={() => { setFilterDept(0); loadServiceReps(); }}>CLEAR</button>
      </div>

      {/* title */}
      <h2>SERVICE REPS ({serviceReps.length})</h2>
      
      {/* table */}
      <table border={1}>
        <thead>
          <tr>
            <th>NAME</th>
            <th>EMAIL</th>
            <th>DEPARTMENT</th>
            <th>ROLE</th>
            <th>ACTIONS</th>
          </tr>
        </thead>
        
        <tbody>
          {serviceReps.length === 0 && (
            <tr>
              <td colSpan={5}>NO SERVICE REPS FOUND</td>
            </tr>
          )}
          {serviceReps.length > 0 && serviceReps.map((rep) => (
            <tr key={rep.id}>
              <td>{rep.firstName} {rep.lastName}</td>
              <td>{rep.email}</td>
              <td>{getDepartmentName(rep.departmentID)}</td>
              <td>{getRoleName(rep.roleID)}</td>
              <td>
                <button onClick={() => onEdit(rep)}>EDIT</button>
                <button onClick={() => handleDelete(rep.id)}>DELETE</button>
              </td>
            </tr>
          ))}
        </tbody>
      
      </table>
    </div>
  );
};

export default ServiceRepList;
