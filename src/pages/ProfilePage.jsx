import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, MapPin, Plus, X, Loader2 } from 'lucide-react';
import { authService, profileService } from '../services/api';

const INTEREST_OPTIONS = [
    'Dancing', 'Singing', 'Traveling', 'Gym / Fitness', 'Movies', 'Gaming',
    'Cooking', 'Reading', 'Photography', 'Art', 'Hiking', 'Music',
    'Sports', 'Yoga', 'Writing', 'Pets / Animals'
];

const ORIENTATION_OPTIONS = [
    'Straight', 'Gay', 'Lesbian', 'Bisexual', 'Pansexual', 'Asexual', 'Queer', 'Prefer not to say', 'Other'
];

const GENDER_OPTIONS = [
    'Male', 'Female', 'Non-binary', 'Transgender', 'Prefer not to say', 'Custom'
];

const LOOKING_FOR_OPTIONS = [
    'Relationship', 'Dating', 'Friendship', 'Networking'
];

const ProfilePage = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        displayName: '',
        bio: '',
        dateOfBirth: '',
        sexualOrientation: 'Straight',
        genderIdentity: 'Male',
        lookingFor: 'Dating',
        location: {
            city: '',
            country: ''
        },
        interests: [],
    });

    const [photoFile, setPhotoFile] = useState(null);
    const [photoPreview, setPhotoPreview] = useState(null);
    const [customInterest, setCustomInterest] = useState('');

    useEffect(() => {
        const loadProfile = async () => {
            try {
                const profile = await profileService.getProfile();
                if (profile) {
                    setForm({
                        ...profile,
                        dateOfBirth: profile.dateOfBirth ? new Date(profile.dateOfBirth).toISOString().split('T')[0] : ''
                    });
                    if (profile.photoUrl) setPhotoPreview(profile.photoUrl);
                }
            } catch (err) {
                // Profile might not exist yet
            } finally {
                setLoading(false);
            }
        };
        loadProfile();
    }, []);

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPhotoFile(file);
            setPhotoPreview(URL.createObjectURL(file));
        }
    };

    const toggleInterest = (interest) => {
        setForm(prev => ({
            ...prev,
            interests: prev.interests.includes(interest)
                ? prev.interests.filter(i => i !== interest)
                : [...prev.interests, interest]
        }));
    };

    const addCustomInterest = (e) => {
        if (e.key === 'Enter' && customInterest.trim()) {
            if (!form.interests.includes(customInterest.trim())) {
                setForm(prev => ({
                    ...prev,
                    interests: [...prev.interests, customInterest.trim()]
                }));
            }
            setCustomInterest('');
            e.preventDefault();
        }
    };

    const detectLocation = () => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(async (position) => {
                setForm(prev => ({
                    ...prev,
                    location: { ...prev.location, city: 'Detected City', country: 'Detected Country' }
                }));
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);

        try {
            let photoUrl = photoPreview;

            if (photoFile) {
                const uploadRes = await profileService.uploadPhoto(photoFile);
                photoUrl = uploadRes.url;
            }

            await profileService.updateProfile({
                ...form,
                photoUrl,
                isProfileComplete: true
            });

            navigate('/dashboard');
        } catch (err) {
            alert(err.response?.data?.message || 'Error saving profile');
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div style={{ color: 'white', padding: '100px', textAlign: 'center' }}>Loading Profile...</div>;

    return (
        <div style={{ maxWidth: '800px', margin: '100px auto', padding: '20px', color: 'white' }}>
            <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.5rem', marginBottom: '40px', textAlign: 'center' }}>
                Complete Your Profile
            </h1>

            <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>

                {/* Photo Upload Section */}
                <div style={{ gridColumn: '1 / -1', display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '20px' }}>
                    <div style={{
                        width: '150px',
                        height: '150px',
                        borderRadius: '50%',
                        background: '#1a1a1a',
                        border: '2px dashed var(--color-primary)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'relative',
                        overflow: 'hidden',
                        cursor: 'pointer'
                    }} onClick={() => document.getElementById('photo-input').click()}>
                        {photoPreview ? (
                            <img src={photoPreview} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        ) : (
                            <Camera size={40} color="var(--color-primary)" />
                        )}
                        <div style={{
                            position: 'absolute',
                            bottom: 0,
                            width: '100%',
                            background: 'rgba(0,0,0,0.5)',
                            padding: '5px',
                            textAlign: 'center',
                            fontSize: '0.8rem'
                        }}>
                            Change
                        </div>
                    </div>
                    <input type="file" id="photo-input" hidden onChange={handlePhotoChange} accept="image/*" />
                    <p style={{ marginTop: '10px', color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>Upload your best photo</p>
                </div>

                <div className="form-group">
                    <label style={labelStyle}>First Name</label>
                    <input style={inputStyle} value={form.firstName} onChange={e => setForm({ ...form, firstName: e.target.value })} required />
                </div>

                <div className="form-group">
                    <label style={labelStyle}>Last Name</label>
                    <input style={inputStyle} value={form.lastName} onChange={e => setForm({ ...form, lastName: e.target.value })} required />
                </div>

                <div className="form-group">
                    <label style={labelStyle}>Display Name (Optional)</label>
                    <input style={inputStyle} value={form.displayName} onChange={e => setForm({ ...form, displayName: e.target.value })} />
                </div>

                <div className="form-group">
                    <label style={labelStyle}>Date of Birth</label>
                    <input type="date" style={inputStyle} value={form.dateOfBirth} onChange={e => setForm({ ...form, dateOfBirth: e.target.value })} required />
                </div>

                <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                    <label style={labelStyle}>Bio / About Me</label>
                    <textarea style={{ ...inputStyle, height: '120px', resize: 'none' }} value={form.bio} onChange={e => setForm({ ...form, bio: e.target.value })} maxLength={500} placeholder="Tell us something about yourself..." />
                    <p style={{ textAlign: 'right', fontSize: '0.8rem', color: '#666' }}>{(form.bio || '').length}/500</p>
                </div>

                <div className="form-group">
                    <label style={labelStyle}>Sexual Orientation</label>
                    <select style={inputStyle} value={form.sexualOrientation} onChange={e => setForm({ ...form, sexualOrientation: e.target.value })}>
                        {ORIENTATION_OPTIONS.map(opt => <option key={opt} value={opt} style={{ background: '#0F0F0F' }}>{opt}</option>)}
                    </select>
                </div>

                <div className="form-group">
                    <label style={labelStyle}>Gender Identity</label>
                    <select style={inputStyle} value={form.genderIdentity} onChange={e => setForm({ ...form, genderIdentity: e.target.value })}>
                        {GENDER_OPTIONS.map(opt => <option key={opt} value={opt} style={{ background: '#0F0F0F' }}>{opt}</option>)}
                    </select>
                </div>

                <div className="form-group">
                    <label style={labelStyle}>Looking For</label>
                    <select style={inputStyle} value={form.lookingFor} onChange={e => setForm({ ...form, lookingFor: e.target.value })}>
                        {LOOKING_FOR_OPTIONS.map(opt => <option key={opt} value={opt} style={{ background: '#0F0F0F' }}>{opt}</option>)}
                    </select>
                </div>

                <div className="form-group">
                    <label style={labelStyle}>Location</label>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <input style={inputStyle} placeholder="City" value={form.location.city} onChange={e => setForm({ ...form, location: { ...form.location, city: e.target.value } })} />
                        <button type="button" onClick={detectLocation} style={{ background: 'rgba(255,255,255,0.05)', padding: '10px', borderRadius: '8px', border: '1px solid #333' }}>
                            <MapPin size={20} color="var(--color-primary)" />
                        </button>
                    </div>
                </div>

                <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                    <label style={labelStyle}>Interests</label>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '15px' }}>
                        {INTEREST_OPTIONS.map(interest => (
                            <button
                                key={interest}
                                type="button"
                                onClick={() => toggleInterest(interest)}
                                style={{
                                    padding: '8px 16px',
                                    borderRadius: '20px',
                                    border: '1px solid',
                                    borderColor: form.interests.includes(interest) ? 'var(--color-primary)' : '#333',
                                    background: form.interests.includes(interest) ? 'rgba(212, 175, 55, 0.1)' : 'transparent',
                                    color: form.interests.includes(interest) ? 'var(--color-primary)' : 'white',
                                    fontSize: '0.9rem'
                                }}
                            >
                                {interest}
                            </button>
                        ))}
                    </div>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <input
                            placeholder="Add custom interest..."
                            style={inputStyle}
                            value={customInterest}
                            onChange={e => setCustomInterest(e.target.value)}
                            onKeyDown={addCustomInterest}
                        />
                    </div>
                </div>

                <button type="submit" disabled={saving} style={{
                    gridColumn: '1 / -1',
                    marginTop: '20px',
                    padding: '16px',
                    background: 'var(--color-primary)',
                    color: '#000',
                    fontWeight: '700',
                    fontSize: '1.1rem',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px'
                }}>
                    {saving && <Loader2 className="animate-spin" />}
                    {saving ? 'Saving Profile...' : 'Save & Continue'}
                </button>

            </form>
        </div>
    );
};

const labelStyle = {
    display: 'block',
    marginBottom: '8px',
    color: 'var(--color-text-muted)',
    fontSize: '0.9rem',
    fontWeight: '500'
};

const inputStyle = {
    width: '100%',
    padding: '12px',
    background: 'rgba(255,255,255,0.02)',
    border: '1px solid #333',
    borderRadius: '8px',
    color: 'white',
    fontSize: '1rem',
    outline: 'none',
    transition: 'border-color 0.3s ease',
    colorScheme: 'dark',
    cursor: 'text'
};

export default ProfilePage;
