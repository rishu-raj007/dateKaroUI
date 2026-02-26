import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MatchesSidebar from '../components/MatchesSidebar';
import ChatWindow from '../components/ChatWindow';
import { interactionService, profileService } from '../services/api';
import './Chat.css';

const ChatPage = () => {
    const { matchId } = useParams();
    const [matches, setMatches] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchMatches = async () => {
        try {
            const matchesData = await interactionService.getMatches();
            setMatches(matchesData);
        } catch (error) {
            console.error('Error refreshing matches', error);
        }
    };

    useEffect(() => {
        const initData = async () => {
            try {
                const profileData = await profileService.getProfile();
                setCurrentUser(profileData);
                await fetchMatches();
            } catch (error) {
                console.error('Error loading chat page data', error);
            } finally {
                setLoading(false);
            }
        };

        initData();
    }, []);

    // Refresh matches automatically when matchId changes (so unread counts drop to 0)
    useEffect(() => {
        if (!loading) {
            fetchMatches();
        }
    }, [matchId]);

    const currentMatch = matches.find((m) => m._id === matchId);

    if (loading) {
        return <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#050505', color: '#fff', fontSize: '1.2rem' }}>Loading matches...</div>;
    }

    return (
        <div className="chat-container">
            <MatchesSidebar matches={matches} currentMatchId={matchId} />
            <ChatWindow matchId={matchId} currentUserId={currentUser?.userId || currentUser?._id} currentMatch={currentMatch} refreshMatches={fetchMatches} />
        </div>
    );
};

export default ChatPage;
