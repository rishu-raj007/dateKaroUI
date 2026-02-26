import React, { useState, useEffect, useRef } from 'react';
import { messageService } from '../services/api';
import { format } from 'date-fns';
import { Send, ArrowLeft, MessageSquareHeart } from 'lucide-react';
import io from 'socket.io-client';
import { useNavigate } from 'react-router-dom';

const SOCKET_URL = 'http://localhost:5050';

const ChatWindow = ({ matchId, currentUserId, currentMatch, refreshMatches }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [socket, setSocket] = useState(null);
    const messagesEndRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Connect to Socket.io
        const newSocket = io(SOCKET_URL);
        setSocket(newSocket);

        newSocket.on('connect', () => {
            console.log('Connected to socket server');
            newSocket.emit('join', currentUserId);
        });

        newSocket.on('receiveMessage', (message) => {
            if (message.senderId === matchId || message.receiverId === matchId) {
                setMessages((prev) => [...prev, message]);
            }
            if (refreshMatches) refreshMatches(); // Global refresh to update sidebar
        });

        return () => newSocket.close();
    }, [currentUserId, matchId]);

    useEffect(() => {
        if (matchId) {
            fetchMessages();
        }
    }, [matchId]);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const fetchMessages = async () => {
        try {
            const data = await messageService.getMessages(matchId);
            setMessages(data);
        } catch (error) {
            console.error('Failed to fetch messages', error);
        }
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!newMessage.trim() || !matchId) return;

        try {
            const messageData = {
                senderId: currentUserId,
                receiverId: matchId,
                message: newMessage,
                createdAt: new Date().toISOString()
            };

            // Optimistic update
            setMessages((prev) => [...prev, messageData]);

            // Emit to socket
            if (socket) {
                socket.emit('sendMessage', messageData);
            }

            // Save to DB
            await messageService.sendMessage(matchId, newMessage);
            setNewMessage('');
            if (refreshMatches) refreshMatches();
        } catch (error) {
            console.error('Failed to send message', error);
            // Optionally remove from optimisitic update if fail
        }
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    if (!matchId) {
        return (
            <div className="chat-window chat-window-empty">
                <MessageSquareHeart size={64} color="#ff4b91" strokeWidth={1.5} style={{ marginBottom: '20px' }} />
                <h2>Your Messages</h2>
                <p>Select a match from the sidebar to start chatting!</p>
            </div>
        );
    }

    return (
        <div className="chat-window">
            <div className="chat-header">
                <button className="back-btn" onClick={() => navigate('/chat')}>
                    <ArrowLeft size={24} />
                </button>
                <img
                    src={currentMatch?.profilePhoto || `https://ui-avatars.com/api/?name=${currentMatch?.firstName || 'User'}+${currentMatch?.lastName || ''}&background=random`}
                    alt="Match"
                    className="chat-header-avatar"
                />
                <div className="chat-header-info">
                    <h3 className="chat-header-name">{currentMatch?.firstName || 'Match'} {currentMatch?.lastName || ''}</h3>
                    <p className="chat-header-status">Match active</p>
                </div>
            </div>

            <div className="chat-messages">
                {messages.length === 0 ? (
                    <div style={{ textAlign: 'center', color: '#666', marginTop: '40px' }}>
                        <p>No messages yet. Say hi! 👋</p>
                    </div>
                ) : (
                    messages.map((msg, index) => {
                        const isSelf = msg.senderId === currentUserId;
                        return (
                            <div key={index} className={`chat-message-wrapper ${isSelf ? 'self' : 'other'}`}>
                                <div className={`chat-bubble ${isSelf ? 'self' : 'other'}`}>
                                    {msg.message}
                                </div>
                                <span className="chat-timestamp">
                                    {msg.createdAt ? format(new Date(msg.createdAt), 'p') : 'Just now'}
                                </span>
                            </div>
                        );
                    })
                )}
                <div ref={messagesEndRef} />
            </div>

            <div className="chat-input-area">
                <form onSubmit={handleSendMessage} className="chat-input-form">
                    <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type a message..."
                        className="chat-input-field"
                    />
                    <button
                        type="submit"
                        disabled={!newMessage.trim()}
                        className="chat-send-btn"
                    >
                        <Send size={20} />
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ChatWindow;
