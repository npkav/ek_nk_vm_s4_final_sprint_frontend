/// <reference types="@testing-library/jest-dom" />
import React from 'react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CustomerList from '../CustomerList';
import { renderWithRouter } from '../../test/test-utils';

describe('CustomerList Component', () => {
  const onEditMock = vi.fn();
  
  beforeEach(() => {
    vi.clearAllMocks();
  });
  
  it('renders the customer list with proper data', async () => {
    renderWithRouter(<CustomerList onEdit={onEditMock} refresh={false} />);
    
    expect(screen.getByText(/CUSTOMERS/)).toBeInTheDocument();
    
    await waitFor(() => {
      expect(screen.getAllByText(/EDIT/).length).toBeGreaterThan(0);
    });
  });
  
  it('handles search functionality correctly', async () => {
    const user = userEvent.setup();
    renderWithRouter(<CustomerList onEdit={onEditMock} refresh={false} />);
    
    const searchInput = screen.getByPlaceholderText('SEARCH CUSTOMERS...');
    
    await user.type(searchInput, 'John');
    await user.click(screen.getByText('SEARCH'));
    
    await user.click(screen.getByText('CLEAR'));
    expect(searchInput).toHaveValue('');
  });
  
  it('handles customer actions (edit) correctly', async () => {
    const user = userEvent.setup();
    renderWithRouter(<CustomerList onEdit={onEditMock} refresh={false} />);
    
    await waitFor(() => {
      expect(screen.getAllByText('EDIT').length).toBeGreaterThan(0);
    });
    
    await user.click(screen.getAllByText('EDIT')[0]);
    expect(onEditMock).toHaveBeenCalled();
  });
});
