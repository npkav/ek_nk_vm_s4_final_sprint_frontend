import React, { useState } from 'react';
import CustomerList from './components/CustomerList';
import CustomerForm from './components/CustomerForm';
import type { Customer } from './types';

function App() {
  const [showForm, setShowForm] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
  const [refresh, setRefresh] = useState(0);

  const handleAddNew = () => {
    setEditingCustomer(null);
    setShowForm(true);
  };

  const handleEdit = (customer: Customer) => {
    setEditingCustomer(customer);
    setShowForm(true);
  };

  const handleFormSuccess = () => {
    setShowForm(false);
    setEditingCustomer(null);
    setRefresh(refresh + 1);
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingCustomer(null);
  };

  return (
    <div>
      <header>
        <h1>Customer Management</h1>
        {!showForm && (
          <button onClick={handleAddNew}>Add New Customer</button>
        )}
      </header>

      <main>
        {!showForm ? (
          <CustomerList
            onEdit={handleEdit}
            refresh={refresh > 0}
          />
        ) : (
          <CustomerForm
            customer={editingCustomer}
            onSuccess={handleFormSuccess}
            onCancel={handleFormCancel}
          />
        )}
      </main>

      <footer>
        <p>EK/NK/VM - FINAL SPRINT - SD12</p>
      </footer>
    </div>
  );
}

export default App;