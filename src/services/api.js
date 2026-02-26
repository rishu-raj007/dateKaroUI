import axios from 'axios';

const API_URL = 'http://localhost:5050/api';

const api = axios.create({
    baseURL: API_URL,
});

// Auto attach JWT token to every request
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const authService = {
    async register(email, password) {
        const { data } = await api.post('/auth/register', { email, password });
        if (data.token) localStorage.setItem('token', data.token);
        return data;
    },

    async login(email, password) {
        const { data } = await api.post('/auth/login', { email, password });
        if (data.token) localStorage.setItem('token', data.token);
        return data;
    },

    async socialLogin(email, socialProvider, socialId) {
        const { data } = await api.post('/auth/social-login', { email, socialProvider, socialId });
        if (data.token) localStorage.setItem('token', data.token);
        return data;
    },

    async logout() {
        localStorage.removeItem('token');
    },

    async getCurrentUser() {
        // In a real app, you might have a /me endpoint
        // For now, let's assume we decode the token or just return a mock if token exists
        const token = localStorage.getItem('token');
        if (!token) return null;
        try {
            const { data } = await api.get('/profile/me');
            return data; // returns user profile info
        } catch (err) {
            return null;
        }
    }
};

export const profileService = {
    async getProfile() {
        const { data } = await api.get('/profile/me');
        return data;
    },

    async updateProfile(profileData) {
        const { data } = await api.put('/profile/update', profileData);
        return data;
    },

    async uploadPhoto(file) {
        const formData = new FormData();
        formData.append('photo', file);
        const { data } = await api.post('/profile/upload-photo', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        return data;
    }
};

export const interactionService = {
    async likeUser(userId) {
        const { data } = await api.post(`/interactions/like/${userId}`);
        return data; // { message, isMatch }
    },

    async getLikedProfiles() {
        const { data } = await api.get('/interactions/liked-profiles');
        return data;
    },

    async getMatches() {
        const { data } = await api.get('/interactions/matches');
        return data;
    },
};

export const messageService = {
    async getMessages(matchId) {
        const { data } = await api.get(`/messages/${matchId}`);
        return data;
    },

    async sendMessage(receiverId, message) {
        const { data } = await api.post('/messages', { receiverId, message });
        return data;
    },
};

export default api;
