import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SocialLogin from '../components/SocialLogin';
import { authService } from '../services/api';

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            return setError('Passwords do not match');
        }

        setLoading(true);
        try {
            await authService.register(email, password);
            navigate('/profile-setup');
        } catch (err) {
            setError(err.response?.data?.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="signup-page" style={{
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            paddingTop: '60px'
        }}>
            <div className="login-card" style={{
                width: '100%',
                maxWidth: '400px',
                padding: '40px',
                background: 'rgba(255,255,255,0.03)',
                backdropFilter: 'blur(10px)',
                borderRadius: '16px',
                border: '1px solid rgba(255,255,255,0.1)'
            }}>
                <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', textAlign: 'center', marginBottom: '30px', color: 'white' }}>
                    Create Account
                </h2>

                {error && <p style={{ color: '#ff4d4d', textAlign: 'center', marginBottom: '15px', fontSize: '0.9rem' }}>{error}</p>}

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div className="form-group">
                        <label style={{ display: 'block', marginBottom: '8px', color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>Email Address</label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '12px',
                                background: 'rgba(0,0,0,0.3)',
                                border: '1px solid #333',
                                borderRadius: '8px',
                                color: 'white',
                                fontSize: '1rem'
                            }}
                        />
                    </div>

                    <div className="form-group">
                        <label style={{ display: 'block', marginBottom: '8px', color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>Password</label>
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '12px',
                                background: 'rgba(0,0,0,0.3)',
                                border: '1px solid #333',
                                borderRadius: '8px',
                                color: 'white',
                                fontSize: '1rem'
                            }}
                        />
                    </div>

                    <div className="form-group">
                        <label style={{ display: 'block', marginBottom: '8px', color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>Confirm Password</label>
                        <input
                            type="password"
                            required
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '12px',
                                background: 'rgba(0,0,0,0.3)',
                                border: '1px solid #333',
                                borderRadius: '8px',
                                color: 'white',
                                fontSize: '1rem'
                            }}
                        />
                    </div>

                    <button type="submit" disabled={loading} style={{
                        marginTop: '10px',
                        padding: '14px',
                        background: loading ? '#666' : 'var(--color-primary)',
                        color: '#000',
                        fontWeight: '600',
                        fontSize: '1rem',
                        borderRadius: '8px',
                        border: 'none',
                        cursor: loading ? 'not-allowed' : 'pointer'
                    }}>
                        {loading ? 'Creating Account...' : 'Sign Up'}
                    </button>
                </form>

                <SocialLogin />

                <p style={{ textAlign: 'center', marginTop: '20px', color: '#666', fontSize: '0.9rem' }}>
                    Already have an account? <Link to="/signin" style={{ color: 'var(--color-primary)' }}>Sign In</Link>
                </p>
            </div>
        </div>
    );
};

export default SignUp;
