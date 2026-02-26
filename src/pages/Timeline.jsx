import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProfileCard from '../components/ProfileCard';
import { getTimeline, likeProfile, dislikeProfile, superLikeProfile, saveProfile } from '../services/timelineService';
import { profileService } from '../services/api';
import { Loader2, RefreshCw } from 'lucide-react';
import './Timeline.css';

const Timeline = () => {
    const [profiles, setProfiles] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchInitialData();
    }, []);

    const fetchInitialData = async () => {
        setLoading(true);
        try {
            const [timelineData, userData] = await Promise.all([
                getTimeline(),
                profileService.getProfile()
            ]);

            // Augment current user with cinematic traits for consistency
            const augmentedUser = {
                ...userData,
                isSelf: true,
                compatibility: 100,
                mood: 'My Current Vibe',
                pros: userData.interests?.slice(0, 2) || ["Dating Expert", "Great Profiler"],
                cons: ["Always looking for more fries"]
            };

            setProfiles([augmentedUser, ...timelineData]);
            setCurrentUser(augmentedUser);
            setError(null);
        } catch (err) {
            console.error('Error fetching data:', err);
            setError('Failed to load profiles. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const fetchProfiles = async () => {
        setLoading(true);
        try {
            const data = await getTimeline();
            setProfiles(data);
            setError(null);
        } catch (err) {
            console.error('Error fetching timeline:', err);
            setError('Failed to load profiles. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleLike = async (userId) => {
        if (currentUser && userId === (currentUser.userId || currentUser._id)) return; // Can't like yourself
        try {
            const result = await likeProfile(userId);
            if (result.isMatch) {
                alert("It's a Match! 🎯");
            }
            removeTopProfile();
        } catch (err) {
            console.error('Like error:', err);
        }
    };

    const handleDislike = async (userId) => {
        if (currentUser && userId === (currentUser.userId || currentUser._id)) {
            removeTopProfile();
            return;
        }
        try {
            await dislikeProfile(userId);
            removeTopProfile();
        } catch (err) {
            console.error('Dislike error:', err);
        }
    };

    const handleSuperLike = async (userId) => {
        if (currentUser && userId === (currentUser.userId || currentUser._id)) return;
        try {
            const result = await superLikeProfile(userId);
            if (result.isMatch) {
                alert("It's a Super Match! ⭐");
            }
            removeTopProfile();
        } catch (err) {
            console.error('SuperLike error:', err);
        }
    };

    const handleSave = async (userId) => {
        if (currentUser && userId === (currentUser.userId || currentUser._id)) return;
        try {
            await saveProfile(userId);
            alert("Profile Bookmarked! 🔖");
        } catch (err) {
            console.error('Save error:', err);
        }
    };

    const handleChat = (userId) => {
        if (userId === 'edit') {
            navigate('/dashboard');
            return;
        }
        navigate(`/chat/${userId}`);
    };

    const removeTopProfile = () => {
        setProfiles(prev => prev.slice(1));
    };

    if (loading && profiles.length === 0) {
        return (
            <div className="timeline-loader">
                <Loader2 className="loader-icon" size={48} color="#ffd700" />
                <p>Finding potential matches...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="timeline-error">
                <p className="error-text">{error}</p>
                <button
                    onClick={fetchInitialData}
                    className="retry-btn"
                >
                    <RefreshCw size={20} /> Retry
                </button>
            </div>
        );
    }

    return (
        <div className="timeline-container">
            {/* Background elements for depth */}
            <div className="timeline-bg-glow-1"></div>
            <div className="timeline-bg-glow-2"></div>

            <div className="card-stack-container">
                {profiles.length > 0 ? (
                    [...profiles].map((profile) => (
                        <ProfileCard
                            key={profile.userId || profile._id}
                            profile={profile}
                            onLike={handleLike}
                            onDislike={handleDislike}
                            onSuperLike={handleSuperLike}
                            onSave={handleSave}
                            onChat={handleChat}
                        />
                    )).reverse()
                ) : (
                    <div className="empty-state">
                        <h2>That's everyone!</h2>
                        <p>Check back later for more profiles or change your preferences.</p>
                        <button
                            onClick={fetchProfiles}
                            className="refresh-btn"
                        >
                            Refresh Feed
                        </button>
                    </div>
                )}
            </div>

            {/* Helper text */}
            {profiles.length > 0 && (
                <div className="interaction-hint">
                    Swipe or use buttons to interact
                </div>
            )}
        </div>
    );
};

export default Timeline;
