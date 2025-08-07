import { API_CLIENT } from './api';
import type { Feedback, CreateFeedbackReq, UpdateFeedbackReq } from '../types';

class FeedbackService {
  private readonly basePath = '/feedback';

  async getAllFeedback(): Promise<Feedback[]> {
    const response = await API_CLIENT.get<Feedback[]>(this.basePath);
    return response.data;
  }

  async getFeedbackById(id: number): Promise<Feedback> {
    const response = await API_CLIENT.get<Feedback>(`${this.basePath}/${id}`);
    return response.data;
  }

  async getFeedbackByRep(repID: number): Promise<Feedback[]> {
    const response = await API_CLIENT.get<Feedback[]>(`${this.basePath}/rep/${repID}`);
    return response.data;
  }

  async getAverageRatingByRep(repID: number): Promise<number> {
    const response = await API_CLIENT.get<number>(`${this.basePath}/rep/${repID}/average-rating`);
    return response.data;
  }

  async getFeedbackByRating(rating: number): Promise<Feedback[]> {
    const response = await API_CLIENT.get<Feedback[]>(`${this.basePath}/filter`, {
      params: { rating }
    });
    return response.data;
  }

  async createFeedback(feedback: CreateFeedbackReq): Promise<Feedback> {
    const response = await API_CLIENT.post<Feedback>(this.basePath, feedback);
    return response.data;
  }

  async updateFeedback(id: number, feedback: UpdateFeedbackReq): Promise<Feedback> {
    const response = await API_CLIENT.put<Feedback>(`${this.basePath}/${id}`, feedback);
    return response.data;
  }

  async deleteFeedback(id: number): Promise<void> {
    await API_CLIENT.delete(`${this.basePath}/${id}`);
  }
}

export const feedbackService = new FeedbackService();
export default feedbackService;
