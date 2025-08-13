import React, { useState, useEffect } from 'react';
import type { Issue, Customer } from '../types';
import { issueService } from '../services/issueService';

interface IssueProperties {onEdit: (issue: Issue) => void; refresh: boolean; customers: Customer[];}

const IssueList: React.FC<IssueProperties> = ({ onEdit, refresh, customers }) => {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);

  // hrmmm
  useEffect(() => {loadIssues();}, [refresh]);


  // tf u do this time
  const loadIssues = async () => {
    setIsLoading(true);
    try {
      let data;
      if (selectedCustomer) {data = await issueService.getIssuesByCustomer(selectedCustomer);} 
      else {data = await issueService.getAllIssues();}
      setIssues(data);
    }
    catch (err) {console.error(err);}
    finally {setIsLoading(false);}
  };


  // filter shi
  const handleFilterChange = () => {loadIssues();};


  // so long boi
  const handleDelete = async (id: number) => {
    if (window.confirm('DELETE THIS ISSUE?')) {
      try {
        await issueService.deleteIssue(id);
        setIssues(issues.filter(issue => issue.id !== id));
      }
      catch (err) {console.error(err);}
    }
  };

  const getCustomerName = (customerID: number) => {
    const customer = customers.find(c => c.id === customerID);
    return customer ? `${customer.firstName} ${customer.lastName}` : 'Unknown';
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'URGENT': return '#ff0000';
      case 'HIGH': return '#ff6600';
      case 'MEDIUM': return '#ffaa00';
      case 'LOW': return '#00aa00';
      default: return '#000000';
    }
  };

  // table
  return (
    <div>
      <div>
        {/* filter dropdown */}
        <label>FILTER BY CUSTOMER: </label>
        <select 
          value={selectedCustomer} 
          onChange={(e) => { setSelectedCustomer(Number(e.target.value)); handleFilterChange(); }}
        >
          <option value={0}>ALL CUSTOMERS</option>
          {customers.map(customer => (
            <option key={customer.id} value={customer.id}>
              {customer.firstName} {customer.lastName}
            </option>
          ))}
        </select>
        <button onClick={handleFilterChange}>FILTER</button>
        <button onClick={() => { setSelectedCustomer(0); loadIssues(); }}>CLEAR</button>
      </div>

      {/* title */}
      <h2>TRAVEL ISSUES ({issues.length})</h2>
      
      {/* table */}
      <table border={1}>
        <thead>
          <tr>
            <th>CUSTOMER</th>
            <th>TITLE</th>
            <th>STATUS</th>
            <th>PRIORITY</th>
            <th>DESCRIPTION</th>
            <th>ACTIONS</th>
          </tr>
        </thead>
        
        <tbody>
          {isLoading && (
            <tr>
              <td colSpan={6}>LOADING...</td>
            </tr>
          )}
          {!isLoading && issues.length === 0 && (
            <tr>
              <td colSpan={6}>NO ISSUES FOUND</td>
            </tr>
          )}
          {!isLoading && issues.map((issue) => (
            <tr key={issue.id}>
              <td>{getCustomerName(issue.customerID)}</td>
              <td>{issue.title}</td>
              <td>{issue.status}</td>
              <td style={{ color: getPriorityColor(issue.priority) }}>
                {issue.priority}
              </td>
              <td>{issue.description.substring(0, 100)}...</td>
              <td>
                <button onClick={() => onEdit(issue)}>EDIT</button>
                <button onClick={() => handleDelete(issue.id)}>DELETE</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default IssueList;
