import API from './api';

export const getTimeline = async () => {
    const response = await API.get('/timeline');
    return response.data;
};

export const handleInteraction = async (toUserId, type) => {
    const response = await API.post('/timeline/interaction', { toUserId, type });
    return response.data;
};

export const likeProfile = (toUserId) => handleInteraction(toUserId, 'like');
export const dislikeProfile = (toUserId) => handleInteraction(toUserId, 'dislike');
export const superLikeProfile = (toUserId) => handleInteraction(toUserId, 'superlike');
export const saveProfile = (toUserId) => handleInteraction(toUserId, 'save');
