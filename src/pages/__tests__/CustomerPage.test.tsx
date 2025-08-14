import { vi, describe, it, expect, beforeEach } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CustomerPage from '../CustomerPage';
import { renderWithRouter } from '../../test/test-utils';

describe('CustomerPage Component', () => {
  const refreshDataMock = vi.fn();
  const testCustomers = [
    { 
      id: 1, 
      firstName: 'Test', 
      lastName: 'User', 
      email: 'test@example.com' 
    }
  ];
  
  beforeEach(() => {
    vi.clearAllMocks();
  });
  
  it('renders the customer page with proper title', () => {
    renderWithRouter(<CustomerPage customers={testCustomers} refreshData={refreshDataMock} />);
    
    expect(screen.getByText('Customers & Issues Reported')).toBeInTheDocument();
    expect(screen.getByText('View all customers')).toBeInTheDocument();
    expect(screen.getByText('View all issues')).toBeInTheDocument();
    expect(screen.getByText('Report new issue for a customer')).toBeInTheDocument();
    expect(screen.getByText('Add new customer')).toBeInTheDocument();
  });
  
  it('expands customer section when clicked', async () => {
    const user = userEvent.setup();
    renderWithRouter(<CustomerPage customers={testCustomers} refreshData={refreshDataMock} />);
    
    await user.click(screen.getByText('View all customers'));
  });
});
