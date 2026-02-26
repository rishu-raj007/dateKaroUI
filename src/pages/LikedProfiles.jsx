import React, { useEffect, useState } from 'react';
import { interactionService } from '../services/api';
import { Heart, User as UserIcon, MapPin } from 'lucide-react';
import './LikedProfiles.css';
import { useNavigate } from 'react-router-dom';

const LikedProfiles = () => {
    const [likedUsers, setLikedUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchLikes = async () => {
            try {
                const data = await interactionService.getLikedProfiles();
                setLikedUsers(data);
            } catch (error) {
                console.error('Failed to fetch liked profiles', error);
            } finally {
                setLoading(false);
            }
        };
        fetchLikes();
    }, []);

    if (loading) {
        return <div className="p-8 text-center mt-20 text-white font-bold text-xl">Loading...</div>;
    }

    return (
        <div className="liked-container min-h-screen bg-black pt-28 px-4 pb-12">
            <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-500 text-center mb-10 flex justify-center items-center gap-3">
                <Heart fill="currentColor" size={36} color="#ff1493" />
                Profiles You Liked
            </h1>

            {likedUsers.length === 0 ? (
                <div className="text-center text-gray-400 mt-20 text-lg">
                    You haven't liked anyone yet. Head to the timeline to find your match!
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
                    {likedUsers.map((user) => (
                        <div key={user._id} className="liked-card bg-gray-900 rounded-2xl overflow-hidden shadow-lg border border-gray-800 transition-all hover:scale-105 hover:shadow-pink-500/20">
                            <img
                                src={user.profilePhoto || `https://ui-avatars.com/api/?name=${user.firstName}+${user.lastName}&background=random`}
                                alt={`${user.firstName} ${user.lastName}`}
                                className="w-full h-64 object-cover"
                            />
                            <div className="p-5">
                                <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                                    {user.firstName} {user.lastName}, {user.age || 'N/A'}
                                </h3>
                                <p className="text-gray-400 flex items-center gap-1 text-sm mb-4">
                                    <MapPin size={16} /> {user.location?.city || 'Unknown Location'}
                                </p>
                                <button
                                    onClick={() => navigate(`/profile/${user._id}`)}
                                    className="w-full bg-gradient-to-r from-pink-600 to-red-500 text-white font-bold py-2 rounded-xl hover:opacity-90 transition-opacity"
                                >
                                    View Profile
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default LikedProfiles;
