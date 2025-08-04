import axios from 'axios';

const API_BASE_URL = 'https://develevate-52lh.onrender.com/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
});

// Store the getToken function reference
let getTokenFunction: (() => Promise<string | null>) | null = null;

export const setAuthToken = (getToken: () => Promise<string | null>) => {
  getTokenFunction = getToken;
};

// Request interceptor to add auth token
api.interceptors.request.use(
  async (config) => {
    if (getTokenFunction) {
      try {
        const token = await getTokenFunction();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      } catch (error) {
        console.error('Error getting auth token:', error);
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized - could redirect to login
      console.error('Unauthorized request');
    }
    return Promise.reject(error);
  }
);

// API methods
export const apiClient = {
  // User methods
  getProfile: () => api.get('/users/profile'),
  updateProfile: (data: any) => api.put('/users/profile', data),

  // Resume methods
  getResumes: () => api.get('/resumes'),
  createResume: (data: any) => api.post('/resumes/build', data),
  uploadResume: (file: File) => {
    const formData = new FormData();
    formData.append('resume', file);
    return api.post('/resumes/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  },
  deleteResume: (id: string) => api.delete(`/resumes/${id}`),

  // Portfolio methods
  getPortfolios: () => api.get('/portfolios'),
  createPortfolio: (data: any) => api.post('/portfolios', data),
  deletePortfolio: (id: string) => api.delete(`/portfolios/${id}`),

  // GitHub methods
  getGithubRepos: () => api.get('/github/repos'),
  
  // AI methods
  generateCoverLetter: (data: any) => api.post('/ai/cover-letter', data),
  checkAtsScore: (data: any) => api.post('/ai/ats-score', data),
};

export default apiClient;