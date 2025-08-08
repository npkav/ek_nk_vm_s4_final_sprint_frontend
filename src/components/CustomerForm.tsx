import React, { useState } from 'react';
import type { Customer } from '../types';
import { customerService } from '../services/customerService';

interface CustomerProperties {
  customer?: Customer | null;
  onSuccess: () => void;
  onCancel: () => void;
}

const CustomerForm: React.FC<CustomerProperties> = ({ customer, onSuccess, onCancel }) => {
  const [firstName, setFirstName] = useState(customer?.firstName || '');
  const [lastName, setLastName] = useState(customer?.lastName || '');
  const [email, setEmail] = useState(customer?.email || '');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = { firstName, lastName, email };
      if (customer) {await customerService.updateCustomer(customer.id, data);}
      else {await customerService.createCustomer(data);}
      onSuccess();
    }
    catch (err) {console.error(err);}
    finally {setLoading(false);}
  };

  return (
    <fieldset>
      <legend>{customer ? 'EDIT CUSTOMER' : 'ADD CUSTOMER'}</legend>
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

export default CustomerForm;