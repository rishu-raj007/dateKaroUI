import React, { useState } from 'react';
import { Heart, X, Star, MessageCircle, Bookmark, MapPin, CheckCircle2, AlertCircle, Settings, User as UserIcon } from 'lucide-react';
import './ProfileCard.css';

const ProfileCard = ({ profile, onLike, onDislike, onSuperLike, onSave, onChat }) => {
    const [dragStart, setDragStart] = useState(null);
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
    const [exitDirection, setExitDirection] = useState(null);

    const handleMouseDown = (e) => {
        setDragStart({ x: e.clientX, y: e.clientY });
    };

    const handleMouseMove = (e) => {
        if (!dragStart) return;
        const dx = e.clientX - dragStart.x;
        const dy = e.clientY - dragStart.y;
        setDragOffset({ x: dx, y: dy });
    };

    const handleMouseUp = () => {
        if (!dragStart) return;

        const threshold = 150;
        if (dragOffset.x > threshold) {
            handleExit('right');
        } else if (dragOffset.x < -threshold) {
            handleExit('left');
        } else if (dragOffset.y < -threshold) {
            handleExit('up');
        } else {
            setDragOffset({ x: 0, y: 0 });
        }
        setDragStart(null);
    };

    const handleExit = (direction) => {
        setExitDirection(direction);
        setTimeout(() => {
            if (direction === 'right') onLike(profile.userId);
            if (direction === 'left') onDislike(profile.userId);
            if (direction === 'up') onSuperLike(profile.userId);
        }, 300);
    };

    // Touch support
    const handleTouchStart = (e) => {
        setDragStart({ x: e.touches[0].clientX, y: e.touches[0].clientY });
    };

    const handleTouchMove = (e) => {
        if (!dragStart) return;
        const dx = e.touches[0].clientX - dragStart.x;
        const dy = e.touches[0].clientY - dragStart.y;
        setDragOffset({ x: dx, y: dy });
    };

    const cardStyle = {
        transform: exitDirection
            ? `translate(${exitDirection === 'right' ? 1000 : exitDirection === 'left' ? -1000 : 0}px, ${exitDirection === 'up' ? -1000 : 0}px) rotate(${exitDirection === 'right' ? 20 : exitDirection === 'left' ? -20 : 0}deg)`
            : `translate(${dragOffset.x}px, ${dragOffset.y}px) rotate(${dragOffset.x * 0.05}deg)`,
        opacity: exitDirection ? 0 : 1,
        transition: exitDirection ? 'all 0.3s ease-out' : 'none'
    };

    return (
        <div
            className="profile-card-container"
            style={cardStyle}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleMouseUp}
        >
            <div className="profile-card">
                <div className="mood-badge">{profile.mood || 'Chill Energy'}</div>
                <div className="compatibility-badge">{profile.compatibility}% Match</div>

                <div className="card-image-section">
                    <img
                        src={profile.photoUrl || 'https://via.placeholder.com/400x600?text=Connect'}
                        alt={profile.firstName}
                        className="profile-photo"
                        draggable="false"
                    />
                    <div className="image-overlay">
                        <div className="profile-name-age">
                            {profile.firstName}, {new Date().getFullYear() - new Date(profile.dateOfBirth).getFullYear()}
                            <span className="online-status"></span>
                        </div>
                        <div className="profile-distance">
                            <MapPin size={14} /> {profile.location?.city || 'Nearby'} • 2 miles away
                        </div>
                    </div>
                </div>

                <div className="card-content-section">
                    <div className="profile-tagline">
                        "{profile.bio?.slice(0, 50) || 'Dating should be fun and meaningful.'}"
                    </div>

                    <div className="personality-section">
                        <div className="personality-block">
                            <h4>Pros</h4>
                            {profile.pros?.map((pro, i) => (
                                <div key={i} className="trait-chip pro">
                                    <CheckCircle2 size={14} color="#ffd700" /> {pro}
                                </div>
                            ))}
                        </div>
                        <div className="personality-block">
                            <h4>Cons</h4>
                            {profile.cons?.map((con, i) => (
                                <div key={i} className="trait-chip con">
                                    <AlertCircle size={14} color="#ff4b2b" /> {con}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="action-buttons-overlay">
                    {profile.isSelf ? (
                        <button
                            className="bg-gradient-to-r from-[#ffd700] to-[#b8860b] text-black font-extrabold px-12 py-3 rounded-full hover:shadow-[0_0_30px_rgba(212,175,55,0.6)] transition-all flex items-center gap-2 transform hover:scale-105"
                            onClick={() => onChat('edit')} // Re-using onChat for edit action or similar
                        >
                            <Settings size={20} /> EDIT MY PROFILE
                        </button>
                    ) : (
                        <>
                            <button className="action-btn dislike" onClick={() => handleExit('left')}>
                                <X size={24} />
                            </button>
                            <button className="action-btn save" onClick={() => onSave(profile.userId)}>
                                <Bookmark size={20} />
                            </button>
                            <button className="action-btn super" onClick={() => handleExit('up')}>
                                <Star size={24} fill="currentColor" />
                            </button>
                            <button className="action-btn chat" onClick={() => onChat(profile.userId)}>
                                <MessageCircle size={24} />
                            </button>
                            <button className="action-btn like" onClick={() => handleExit('right')}>
                                <Heart size={24} fill="currentColor" />
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProfileCard;
