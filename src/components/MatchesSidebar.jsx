import React from 'react';
import { MessageCircle } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

const MatchesSidebar = ({ matches, currentMatchId }) => {
    const navigate = useNavigate();

    return (
        <div className={`chat-sidebar ${currentMatchId ? 'hidden' : ''}`}>
            <div className="chat-sidebar-header">
                <MessageCircle color="#ff4b91" size={28} />
                <h2>Matches</h2>
            </div>

            <div className="chat-match-list">
                {matches.length === 0 ? (
                    <div style={{ padding: '24px', textAlign: 'center', color: '#666' }}>
                        You have no matches yet. Keep discovering!
                    </div>
                ) : (
                    matches.map((match) => (
                        <div
                            key={match._id}
                            onClick={() => navigate(`/chat/${match._id}`)}
                            className={`chat-match-item ${currentMatchId === match._id ? 'active' : ''}`}
                        >
                            <img
                                src={match.profilePhoto || `https://ui-avatars.com/api/?name=${match.firstName}+${match.lastName}&background=random`}
                                alt={match.firstName}
                                className="chat-match-avatar"
                            />
                            <div className="chat-match-info">
                                <h4 className="chat-match-name">{match.firstName} {match.lastName}</h4>
                                <p className={`chat-match-preview ${match.unreadCount > 0 && currentMatchId !== match._id ? 'unread' : ''}`}>
                                    {match.lastMessage || 'Tap to start chatting'}
                                </p>
                            </div>
                            {match.unreadCount > 0 && currentMatchId !== match._id && (
                                <div className="chat-unread-badge">
                                    {match.unreadCount > 99 ? '99+' : match.unreadCount}
                                </div>
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default MatchesSidebar;
