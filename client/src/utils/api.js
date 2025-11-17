import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:7666/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if it exists
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  getCurrentUser: () => api.get('/auth/me'),
  updateProfile: (data) => api.put('/auth/profile', data),
};

// Pins API
export const pinsAPI = {
  getPins: (params) => api.get('/pins', { params }),
  getPin: (id) => api.get(`/pins/${id}`),
  getRelatedPins: (id, params) => api.get(`/pins/${id}/related`, { params }),
  createPin: (formData) => {
    return api.post('/pins', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  updatePin: (id, data) => api.put(`/pins/${id}`, data),
  deletePin: (id) => api.delete(`/pins/${id}`),
  toggleLike: (id) => api.post(`/pins/${id}/like`),
  toggleSave: (id) => api.post(`/pins/${id}/save`),
  addComment: (id, data) => api.post(`/pins/${id}/comments`, data),
  getUserPins: (userId, params) => api.get(`/pins/user/${userId}`, { params }),
};

// Users API
export const usersAPI = {
  getUser: (id) => api.get(`/users/${id}`),
  getSavedPins: (id, params) => api.get(`/users/${id}/saved`, { params }),
  toggleFollow: (id) => api.post(`/users/${id}/follow`),
};

export default api;
