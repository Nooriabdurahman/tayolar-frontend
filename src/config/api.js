// API Configuration
export const API_BASE_URL = 'https://tayolar-backend.onrender.com';

// API Endpoints
export const API_ENDPOINTS = {
    AUTH: {
        LOGIN: `${API_BASE_URL}/api/auth/login`,
        SIGNUP: `${API_BASE_URL}/api/auth/signup`,
        VERIFY_EMAIL: `${API_BASE_URL}/api/auth/verify-email`,
    },
    USERS: {
        PROFILE: `${API_BASE_URL}/api/users/profile`,
    },
    JOBS: `${API_BASE_URL}/api/jobs`,
    SERVICES: `${API_BASE_URL}/api/services`,
};
