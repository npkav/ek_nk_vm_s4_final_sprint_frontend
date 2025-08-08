import React, { useState } from 'react';
import type { Issue, Customer } from '../types';
import { issueService } from '../services/issueService';

interface IssueProperties {
  issue?: Issue | null;
  customers: Customer[];
  onSuccess: () => void;
  onCancel: () => void;
}

const IssueForm: React.FC<IssueProperties> = ({ issue, customers, onSuccess, onCancel }) => {
  const [customerID, setCustomerID] = useState(issue?.customerID || 0);
  const [title, setTitle] = useState(issue?.title || '');
  const [description, setDescription] = useState(issue?.description || '');
  const [status, setStatus] = useState(issue?.status || 'OPEN');
  const [priority, setPriority] = useState(issue?.priority || 'MEDIUM');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = { customerID, title, description, status, priority };
      if (issue) {await issueService.updateIssue(issue.id, data);}
      else {await issueService.createIssue(data);}
      onSuccess();
    }
    catch (err) {console.error(err);}
    finally {setLoading(false);}
  };

  return (
    <fieldset>
      <legend>{issue ? 'EDIT ISSUE' : 'REPORT TRAVEL ISSUE'}</legend>
      <form onSubmit={handleSubmit}>
        <div>
          <label>CUSTOMER</label><br/>
          <select
            value={customerID}
            onChange={(e) => setCustomerID(Number(e.target.value))}
            required
          >
            <option value={0}>SELECT CUSTOMER</option>
            {customers.map(customer => (
              <option key={customer.id} value={customer.id}>
                {customer.firstName} {customer.lastName}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>ISSUE TITLE</label><br/>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g., Flight Delay, Lost Baggage, Poor Service"
            required
          />
        </div>
        <div>
          <label>DESCRIPTION</label><br/>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe the issue in detail..."
            rows={4}
            required
          />
        </div>
        <div>
          <label>STATUS</label><br/>
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="OPEN">OPEN</option>
            <option value="IN_PROGRESS">IN PROGRESS</option>
            <option value="RESOLVED">RESOLVED</option>
            <option value="CLOSED">CLOSED</option>
          </select>
        </div>
        <div>
          <label>PRIORITY</label><br/>
          <select value={priority} onChange={(e) => setPriority(e.target.value)}>
            <option value="LOW">LOW</option>
            <option value="MEDIUM">MEDIUM</option>
            <option value="HIGH">HIGH</option>
            <option value="URGENT">URGENT</option>
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

export default IssueForm;
