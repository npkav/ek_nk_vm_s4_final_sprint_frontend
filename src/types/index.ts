// types for backend java entities
export interface Customer {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

export interface Department {
  id: number;
  departmentName: string;
  description: string;
}

export interface Role {
  id: number;
  roleName: string;
  description: string;
  departmentID: number;
}

export interface ServiceRep {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  departmentID: number;
  roleID: number;
}

export interface Issue {
  id: number;
  customerID: number;
  assignedRepID?: number;
  title: string;
  description: string;
  status: string;
  priority: string;
}

export interface Feedback {
  id: number;
  customerID: number;
  repID: number;
  issueID: number;
  rating: number;
  comment: string;
}

// form types for modifying entities
export type CreateCustomerReq = Omit<Customer, 'id'>;
export type UpdateCustomerReq = Partial<CreateCustomerReq>;

export type CreateIssueReq = Omit<Issue, 'id'>;
export type UpdateIssueReq = Partial<CreateIssueReq>;

export type CreateFeedbackReq = Omit<Feedback, 'id'>;
export type UpdateFeedbackReq = Partial<CreateFeedbackReq>;

// API wrapper to be used with axios if needed
export interface APIResponse<T> {
  data: T;
  message?: string;
  status: 'success' | 'error';
}