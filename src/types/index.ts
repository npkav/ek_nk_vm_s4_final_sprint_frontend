// types for backend java entities
export interface Customer {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

// form types for modifying entities
export type CreateCustomerReq = Omit<Customer, 'id'>;
export type UpdateCustomerReq = Partial<CreateCustomerReq>;

// API wrapper to be used with axios if needed
export interface APIResponse<T> {
  data: T;
  message?: string;
  status: 'success' | 'error';
}