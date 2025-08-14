import React, { useState, useEffect } from 'react';
import type { Customer } from '../types';
import { customerService } from '../services/customerService';

interface CustomerProperties {onEdit: (customer: Customer) => void; refresh: boolean;}

const CustomerList: React.FC<CustomerProperties> = ({ onEdit, refresh }) => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  // the gang's all here
  useEffect(() => {loadCustomers();}, [refresh]);


  // bonjour monsieur :3
  const loadCustomers = async () => {
    try {
      let data;
      if (searchTerm) {data = await customerService.searchCustomers(searchTerm);} 
      else {data = await customerService.getAllCustomers();}
      setCustomers(data);
    }
    catch (err) {console.error(err);}
  };


  // howdy y'all!
  const handleSearch = () => {loadCustomers();};


  // "well, it was nice knowing you" ahh function
  const handleDelete = async (id: number) => {
    if (window.confirm('DELETE THIS CUSTOMER?')) {
      try {
        await customerService.deleteCustomer(id);
        setCustomers(customers.filter(customer => customer.id !== id));
      }
      catch (err) {console.error(err);}
    }
  };


  // form shiiii
  return (
    <div>
      <div>
        {/* search bar */}
        <input
          type="text"
          placeholder="SEARCH CUSTOMERS..."
          value={searchTerm}
          onChange={(input) => setSearchTerm(input.target.value)}
          onKeyPress={(input) => input.key === 'Enter' && handleSearch()}
        />
        <button onClick={handleSearch}>SEARCH</button>
        <button onClick={() => { setSearchTerm(''); loadCustomers(); }}>CLEAR</button>
      </div>

      {/* title */}
      <h2>CUSTOMERS ({customers.length})</h2>
      
      {/* table */}
      <table border={1}>
        <thead>
          <tr>
            <th>NAME</th>
            <th>EMAIL</th>
            <th>ACTIONS</th>
          </tr>
        </thead>
        
        <tbody>
          {customers.length === 0 && (
            <tr>
              <td colSpan={3}>NO CUSTOMERS FOUND</td>
            </tr>
          )}
          {customers.length > 0 && customers.map((customer) => (
            <tr key={customer.id}>
              <td>{customer.firstName} {customer.lastName}</td>
              <td>{customer.email}</td>
              <td>
                <button onClick={() => onEdit(customer)}>EDIT</button>
                <button onClick={() => handleDelete(customer.id)}>DELETE</button>
              </td>
            </tr>
          ))}
        </tbody>
      
      </table>
    </div>
  );
};

export default CustomerList;