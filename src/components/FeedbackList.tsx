import React, { useState, useEffect } from 'react';
import type { Feedback, Customer, Issue } from '../types';
import { feedbackService } from '../services/feedbackService';

interface FeedbackProperties {onEdit: (feedback: Feedback) => void; refresh: boolean; customers: Customer[]; issues: Issue[];}

const FeedbackList: React.FC<FeedbackProperties> = ({ 
  onEdit, 
  refresh, 
  customers, 
  issues 
}) => {
  const [feedback, setFeedback] = useState<Feedback[]>([]);
  const [filterRating, setFilterRating] = useState<number>(0);

  // hrmmm
  useEffect(() => {loadFeedback();}, [refresh]);


  // tf u do this time
  const loadFeedback = async () => {
    try {
      let data;
      if (filterRating) {data = await feedbackService.getFeedbackByRating(filterRating);} 
      else {data = await feedbackService.getAllFeedback();}
      setFeedback(data);
    }
    catch (err) {console.error(err);}
  };


  // imdb
  const handleFilterChange = () => {loadFeedback();};


  // shadow realm
  const handleDelete = async (id: number) => {
    if (window.confirm('DELETE THIS FEEDBACK?')) {
      try {
        await feedbackService.deleteFeedback(id);
        setFeedback(feedback.filter(f => f.id !== id));
      }
      catch (err) {console.error(err);}
    }
  };

  const getCustomerName = (customerID: number) => {
    const customer = customers.find(c => c.id === customerID);
    return customer ? `${customer.firstName} ${customer.lastName}` : 'Unknown';
  };

  const getIssueTitle = (issueID: number) => {
    const issue = issues.find(i => i.id === issueID);
    return issue ? issue.title : 'Unknown Issue';
  };

  const getRatingStars = (rating: number) => {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 4) return '#00aa00';
    if (rating >= 3) return '#ffaa00';
    return '#ff0000';
  };

  // table
  return (
    <div>
      <div>
        {/* rating filter */}
        <label>FILTER BY RATING: </label>
        <select 
          value={filterRating} 
          onChange={(e) => setFilterRating(Number(e.target.value))}
        >
          <option value={0}>ALL RATINGS</option>
          <option value={1}>1 STAR</option>
          <option value={2}>2 STARS</option>
          <option value={3}>3 STARS</option>
          <option value={4}>4 STARS</option>
          <option value={5}>5 STARS</option>
        </select>
        <button onClick={handleFilterChange}>FILTER</button>
        <button onClick={() => { setFilterRating(0); loadFeedback(); }}>CLEAR</button>
      </div>

      {/* title */}
      <h2>TRAVEL FEEDBACK ({feedback.length})</h2>
      
      {/* table */}
      <table border={1}>
        <thead>
          <tr>
            <th>CUSTOMER</th>
            <th>ISSUE</th>
            <th>RATING</th>
            <th>COMMENT</th>
            <th>ACTIONS</th>
          </tr>
        </thead>
        
        <tbody>
          {feedback.length === 0 && (
            <tr>
              <td colSpan={5}>NO FEEDBACK FOUND</td>
            </tr>
          )}
          {feedback.map((fb) => (
            <tr key={fb.id}>
              <td>{getCustomerName(fb.customerID)}</td>
              <td>{getIssueTitle(fb.issueID)}</td>
              <td style={{ color: getRatingColor(fb.rating) }}>
                {getRatingStars(fb.rating)} ({fb.rating}/5)
              </td>
              <td>{fb.comment.substring(0, 100)}...</td>
              <td>
                <button onClick={() => onEdit(fb)}>EDIT</button>
                <button onClick={() => handleDelete(fb.id)}>DELETE</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FeedbackList;
