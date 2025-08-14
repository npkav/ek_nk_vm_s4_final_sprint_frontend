import React, { useState } from 'react';
import type { Feedback, Customer, Issue } from '../types';
import { feedbackService } from '../services/feedbackService';

interface FeedbackProperties {
  feedback?: Feedback | null;
  customers: Customer[];
  issues: Issue[];
  onSuccess: () => void;
  onCancel: () => void;
}

const FeedbackForm: React.FC<FeedbackProperties> = ({ 
  feedback, 
  customers, 
  issues, 
  onSuccess, 
  onCancel 
}) => {
  const [customerID, setCustomerID] = useState(feedback?.customerID || 0);
  const [repID] = useState(feedback?.repID || 1);
  const [issueID, setIssueID] = useState(feedback?.issueID || 0);
  const [rating, setRating] = useState(feedback?.rating || 5);
  const [comment, setComment] = useState(feedback?.comment || '');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = { customerID, repID, issueID, rating, comment };
      if (feedback) {await feedbackService.updateFeedback(feedback.id, data);}
      else {await feedbackService.createFeedback(data);}
      onSuccess();
    }
    catch (err) {console.error(err);}
    finally {setLoading(false);}
  };



  return (
    <fieldset>
      <legend>{feedback ? 'EDIT FEEDBACK' : 'SUBMIT TRAVEL FEEDBACK'}</legend>
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
          <label>RELATED ISSUE</label><br/>
          <select
            value={issueID}
            onChange={(e) => setIssueID(Number(e.target.value))}
            required
          >
            <option value={0}>SELECT ISSUE</option>
            {issues
              .filter(issue => issue.customerID === customerID)
              .map(issue => (
                <option key={issue.id} value={issue.id}>
                  {issue.title} - {issue.status}
                </option>
              ))}
          </select>
        </div>
        <div>
          <label>SERVICE RATING (1-5 STARS)</label><br/>
          <select value={rating} onChange={(e) => setRating(Number(e.target.value))}>
            <option value={1}>1 STAR - VERY POOR</option>
            <option value={2}>2 STARS - POOR</option>
            <option value={3}>3 STARS - AVERAGE</option>
            <option value={4}>4 STARS - GOOD</option>
            <option value={5}>5 STARS - EXCELLENT</option>
          </select>
        </div>
        <div>
          <label>FEEDBACK COMMENT</label><br/>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Share your travel experience..."
            rows={4}
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

export default FeedbackForm;
