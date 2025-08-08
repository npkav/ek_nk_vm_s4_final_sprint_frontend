import { API_CLIENT } from './api';
import type { ServiceRep, Issue } from '../types';

class ServiceRepService {
  private readonly basePath = '/servicereps';

  async getAllServiceReps(): Promise<ServiceRep[]> {
    const response = await API_CLIENT.get<ServiceRep[]>(this.basePath);
    return response.data;
  }

  async getServiceRepById(id: number): Promise<ServiceRep> {
    const response = await API_CLIENT.get<ServiceRep>(`${this.basePath}/${id}`);
    return response.data;
  }

  async getIssuesByRep(id: number): Promise<Issue[]> {
    const response = await API_CLIENT.get<Issue[]>(`${this.basePath}/${id}/issues`);
    return response.data;
  }

  async searchServiceReps(name: string): Promise<ServiceRep[]> {
    const response = await API_CLIENT.get<ServiceRep[]>(`${this.basePath}/search`, {
      params: { name }
    });
    return response.data;
  }

  async filterServiceReps(departmentID?: number, roleID?: number): Promise<ServiceRep[]> {
    const params: any = {};
    if (departmentID) params.departmentID = departmentID;
    if (roleID) params.roleID = roleID;
    
    const response = await API_CLIENT.get<ServiceRep[]>(`${this.basePath}/filter`, { params });
    return response.data;
  }

  async createServiceRep(serviceRep: Omit<ServiceRep, 'id'>): Promise<ServiceRep> {
    const response = await API_CLIENT.post<ServiceRep>(this.basePath, serviceRep);
    return response.data;
  }

  async updateServiceRep(id: number, serviceRep: Partial<Omit<ServiceRep, 'id'>>): Promise<ServiceRep> {
    const response = await API_CLIENT.put<ServiceRep>(`${this.basePath}/${id}`, serviceRep);
    return response.data;
  }

  async deleteServiceRep(id: number): Promise<void> {
    await API_CLIENT.delete(`${this.basePath}/${id}`);
  }
}

export const serviceRepService = new ServiceRepService();
export default serviceRepService;
