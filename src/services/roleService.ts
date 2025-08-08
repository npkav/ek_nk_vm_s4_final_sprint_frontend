import { API_CLIENT } from './api';
import type { Role, ServiceRep } from '../types';

class RoleService {
  private readonly basePath = '/roles';

  async getAllRoles(): Promise<Role[]> {
    const response = await API_CLIENT.get<Role[]>(this.basePath);
    return response.data;
  }

  async getRoleById(id: number): Promise<Role> {
    const response = await API_CLIENT.get<Role>(`${this.basePath}/${id}`);
    return response.data;
  }

  async getRepsByRole(id: number): Promise<ServiceRep[]> {
    const response = await API_CLIENT.get<ServiceRep[]>(`${this.basePath}/${id}/reps`);
    return response.data;
  }

  async createRole(role: Omit<Role, 'id'>): Promise<Role> {
    const response = await API_CLIENT.post<Role>(this.basePath, role);
    return response.data;
  }

  async updateRole(id: number, role: Partial<Omit<Role, 'id'>>): Promise<Role> {
    const response = await API_CLIENT.put<Role>(`${this.basePath}/${id}`, role);
    return response.data;
  }

  async deleteRole(id: number): Promise<void> {
    await API_CLIENT.delete(`${this.basePath}/${id}`);
  }
}

export const roleService = new RoleService();
export default roleService;
