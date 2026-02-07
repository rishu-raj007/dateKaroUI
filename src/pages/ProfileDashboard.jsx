import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Edit2, LogOut, Heart, MapPin } from 'lucide-react';
import { authService, profileService } from '../services/api';

const ProfileDashboard = () => {
    const navigate = useNavigate();
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadProfile = async () => {
            try {
                const data = await profileService.getProfile();
                setProfile(data);
            } catch (err) {
                // If 404 or other error, redirect to setup
                navigate('/profile-setup');
            } finally {
                setLoading(false);
            }
        };
        loadProfile();
    }, [navigate]);

    const handleSignOut = async () => {
        await authService.logout();
        navigate('/');
    };

    if (loading) return <div style={{ color: 'white', padding: '100px', textAlign: 'center' }}>Loading Dashboard...</div>;

    if (!profile) return <div style={{ color: 'white', padding: '100px', textAlign: 'center' }}>No profile found. <Link to="/profile-setup" style={{ color: 'var(--color-primary)' }}>Set up now</Link></div>;

    return (
        <div style={{ maxWidth: '1000px', margin: '100px auto', padding: '20px', color: 'white' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
                <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.5rem' }}>Your Profile</h1>
                <div style={{ display: 'flex', gap: '15px' }}>
                    <Link to="/profile-setup" style={{
                        display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px',
                        background: 'rgba(255,255,255,0.05)', borderRadius: '8px', border: '1px solid #333'
                    }}>
                        <Edit2 size={18} /> Edit
                    </Link>
                    <button onClick={handleSignOut} style={{
                        display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px',
                        background: 'rgba(255,77,77,0.1)', color: '#ff4d4d', borderRadius: '8px', border: '1px solid rgba(255,77,77,0.2)'
                    }}>
                        <LogOut size={18} /> Logout
                    </button>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '40px' }}>
                <div style={{ textAlign: 'center' }}>
                    <div style={{
                        width: '300px', height: '300px', borderRadius: '20px', overflow: 'hidden',
                        border: '2px solid var(--color-primary)', marginBottom: '20px', margin: '0 auto'
                    }}>
                        <img src={profile.photoUrl || 'https://via.placeholder.com/300'} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <h2 style={{ fontSize: '2rem', marginBottom: '5px' }}>{profile.firstName} {profile.lastName}</h2>
                    <p style={{ color: 'var(--color-text-muted)', fontSize: '1.1rem' }}>@{profile.displayName || profile.firstName.toLowerCase()}</p>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginTop: '10px', color: 'var(--color-text-muted)' }}>
                        <MapPin size={18} color="var(--color-primary)" />
                        {profile.location?.city}, {profile.location?.country}
                    </div>
                </div>

                <div style={{ background: 'rgba(255,255,255,0.02)', padding: '30px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <section style={{ marginBottom: '30px' }}>
                        <h3 style={{ color: 'var(--color-primary)', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                            About Me
                        </h3>
                        <p style={{ lineHeight: '1.6', color: 'var(--color-text-muted)', fontSize: '1.1rem' }}>
                            {profile.bio || "No bio added yet."}
                        </p>
                    </section>

                    <section style={{ marginBottom: '30px' }}>
                        <h3 style={{ color: 'var(--color-primary)', marginBottom: '15px' }}>Personal Details</h3>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                            <div>
                                <p style={{ fontSize: '0.9rem', color: '#666' }}>Sexual Orientation</p>
                                <p>{profile.sexualOrientation}</p>
                            </div>
                            <div>
                                <p style={{ fontSize: '0.9rem', color: '#666' }}>Gender Identity</p>
                                <p>{profile.genderIdentity}</p>
                            </div>
                            <div>
                                <p style={{ fontSize: '0.9rem', color: '#666' }}>Looking For</p>
                                <p>{profile.lookingFor}</p>
                            </div>
                        </div>
                    </section>

                    <section>
                        <h3 style={{ color: 'var(--color-primary)', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                            Interests
                        </h3>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                            {profile.interests?.map(interest => (
                                <span key={interest} style={{
                                    padding: '8px 16px', borderRadius: '20px',
                                    background: 'rgba(255,255,255,0.05)', border: '1px solid #333', fontSize: '0.9rem'
                                }}>
                                    {interest}
                                </span>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default ProfileDashboard;
