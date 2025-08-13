import { vi, describe, it, expect, beforeEach } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CustomerForm from '../CustomerForm';
import { renderWithRouter } from '../../test/test-utils';

describe('CustomerForm Component', () => {
  const onSuccessMock = vi.fn();
  const onCancelMock = vi.fn();
  
  beforeEach(() => {
    vi.clearAllMocks();
  });
  
  it('renders form correctly in add mode', () => {
    renderWithRouter(<CustomerForm onSuccess={onSuccessMock} onCancel={onCancelMock} />);
    
    expect(screen.getByText('ADD CUSTOMER')).toBeInTheDocument();
    const inputs = screen.getAllByRole('textbox');
    expect(inputs[0]).toHaveValue(''); 
    expect(inputs[1]).toHaveValue(''); 
    expect(inputs[2]).toHaveValue(''); 
  });
  
  it('handles form submission for a new customer', async () => {
    const user = userEvent.setup();
    renderWithRouter(<CustomerForm onSuccess={onSuccessMock} onCancel={onCancelMock} />);
    
    const inputs = screen.getAllByRole('textbox');
    await user.type(inputs[0], 'Test');
    await user.type(inputs[1], 'User');
    await user.type(inputs[2], 'test.user@example.com');
    
    await user.click(screen.getByText('SAVE'));
    
    await waitFor(() => {
      expect(onSuccessMock).toHaveBeenCalled();
    });
  });
  
  it('handles form cancellation', async () => {
    const user = userEvent.setup();
    renderWithRouter(<CustomerForm onSuccess={onSuccessMock} onCancel={onCancelMock} />);
    
    await user.click(screen.getByText('CANCEL'));
    expect(onCancelMock).toHaveBeenCalled();
  });
});
