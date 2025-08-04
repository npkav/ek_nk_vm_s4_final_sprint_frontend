import { API_CLIENT } from './api';
import type { Customer, CreateCustomerReq, UpdateCustomerReq } from '../types';

class CustomerService {
  private readonly basePath = '/customer';

  async getAllCustomers(): Promise<Customer[]> {
    const response = await API_CLIENT.get<Customer[]>(this.basePath);
    return response.data;
  }

  async getCustomerById(id: number): Promise<Customer> {
    const response = await API_CLIENT.get<Customer>(`${this.basePath}/${id}`);
    return response.data;
  }

  async searchCustomers(name: string): Promise<Customer[]> {
    const response = await API_CLIENT.get<Customer[]>(`${this.basePath}/search`, {
      params: { name }
    });
    return response.data;
  }

  async createCustomer(customer: CreateCustomerReq): Promise<Customer> {
    const response = await API_CLIENT.post<Customer>(this.basePath, customer);
    return response.data;
  }

  async updateCustomer(id: number, customer: UpdateCustomerReq): Promise<Customer> {
    const response = await API_CLIENT.put<Customer>(`${this.basePath}/${id}`, customer);
    return response.data;
  }

  async deleteCustomer(id: number): Promise<void> {
    await API_CLIENT.delete(`${this.basePath}/${id}`);
  }
}

export const customerService = new CustomerService();
export default customerService;