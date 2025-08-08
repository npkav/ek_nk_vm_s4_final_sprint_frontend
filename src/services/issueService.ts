import { API_CLIENT } from './api';
import type { Issue, CreateIssueReq, UpdateIssueReq } from '../types';

class IssueService {
  private readonly basePath = '/issues';

  async getAllIssues(): Promise<Issue[]> {
    const response = await API_CLIENT.get<Issue[]>(this.basePath);
    return response.data;
  }

  async getIssueById(id: number): Promise<Issue> {
    const response = await API_CLIENT.get<Issue>(`${this.basePath}/${id}`);
    return response.data;
  }

  async getIssuesByCustomer(customerID: number): Promise<Issue[]> {
    const response = await API_CLIENT.get<Issue[]>(`${this.basePath}/customer/${customerID}`);
    return response.data;
  }

  async createIssue(issue: CreateIssueReq): Promise<Issue> {
    const response = await API_CLIENT.post<Issue>(this.basePath, issue);
    return response.data;
  }

  async updateIssue(id: number, issue: UpdateIssueReq): Promise<Issue> {
    const response = await API_CLIENT.put<Issue>(`${this.basePath}/${id}`, issue);
    return response.data;
  }

  async deleteIssue(id: number): Promise<void> {
    await API_CLIENT.delete(`${this.basePath}/${id}`);
  }
}

export const issueService = new IssueService();
export default issueService;
