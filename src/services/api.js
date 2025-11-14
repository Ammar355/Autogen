const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Helper function to get auth token
const getToken = () => {
  return localStorage.getItem('token');
};

// Helper function to make API requests
const request = async (endpoint, options = {}) => {
  const token = getToken();
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
    ...options,
  };

  if (config.body && typeof config.body === 'object') {
    config.body = JSON.stringify(config.body);
  }

  try {
    const response = await fetch(`${API_URL}${endpoint}`, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Something went wrong');
    }

    return data;
  } catch (error) {
    throw error;
  }
};

// Auth API
export const authAPI = {
  register: (userData) => request('/auth/register', { method: 'POST', body: userData }),
  login: (credentials) => request('/auth/login', { method: 'POST', body: credentials }),
  getMe: () => request('/auth/me'),
  updateProfile: (profileData) => request('/auth/profile', { method: 'PUT', body: profileData }),
};

// Cars API
export const carsAPI = {
  getAll: (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return request(`/cars?${queryString}`);
  },
  getById: (id) => request(`/cars/${id}`),
  create: (carData) => request('/cars', { method: 'POST', body: carData }),
  update: (id, carData) => request(`/cars/${id}`, { method: 'PUT', body: carData }),
  delete: (id) => request(`/cars/${id}`, { method: 'DELETE' }),
};

// Listings API
export const listingsAPI = {
  scan: (scanData) => request('/listings/scan', { method: 'POST', body: scanData }),
  generate: (carData) => request('/listings/generate', { method: 'POST', body: { carData } }),
};

// Garage API
export const garageAPI = {
  get: () => request('/garage'),
  addToSaved: (carId) => request('/garage/saved', { method: 'POST', body: { carId } }),
  removeFromSaved: (carId) => request(`/garage/saved/${carId}`, { method: 'DELETE' }),
  addToWatchlist: (carId, originalPrice) =>
    request('/garage/watchlist', { method: 'POST', body: { carId, originalPrice } }),
  removeFromWatchlist: (carId) => request(`/garage/watchlist/${carId}`, { method: 'DELETE' }),
};

export default {
  auth: authAPI,
  cars: carsAPI,
  listings: listingsAPI,
  garage: garageAPI,
};

