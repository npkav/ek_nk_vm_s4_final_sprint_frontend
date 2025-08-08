import { API_CLIENT } from './api';
import type { Department, ServiceRep } from '../types';

class DepartmentService {
  private readonly basePath = '/departments';

  async getAllDepartments(): Promise<Department[]> {
    const response = await API_CLIENT.get<Department[]>(this.basePath);
    return response.data;
  }

  async getDepartmentById(id: number): Promise<Department> {
    const response = await API_CLIENT.get<Department>(`${this.basePath}/${id}`);
    return response.data;
  }

  async getRepsByDepartment(id: number): Promise<ServiceRep[]> {
    const response = await API_CLIENT.get<ServiceRep[]>(`${this.basePath}/${id}/reps`);
    return response.data;
  }

  async createDepartment(department: Omit<Department, 'id'>): Promise<Department> {
    const response = await API_CLIENT.post<Department>(this.basePath, department);
    return response.data;
  }

  async updateDepartment(id: number, department: Partial<Omit<Department, 'id'>>): Promise<Department> {
    const response = await API_CLIENT.put<Department>(`${this.basePath}/${id}`, department);
    return response.data;
  }

  async deleteDepartment(id: number): Promise<void> {
    await API_CLIENT.delete(`${this.basePath}/${id}`);
  }
}

export const departmentService = new DepartmentService();
export default departmentService;
