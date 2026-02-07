import React from 'react';
import { authService } from '../services/api';

const SocialLogin = () => {
    const handleSocialLogin = async (provider) => {
        // In this implementation, social login is handled by receiving a mock token for now
        // or redirecting to a social login URL. For demo, we'll alert.
        alert(`Social login with ${provider} initiated. This requires OAuth client configuration on the backend.`);
    };

    const buttonStyle = {
        width: '100%',
        padding: '12px',
        marginBottom: '10px',
        border: '1px solid rgba(255,255,255,0.2)',
        borderRadius: '8px',
        background: 'rgba(255,255,255,0.05)',
        color: 'white',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '10px',
        fontSize: '0.9rem',
        transition: 'background 0.3s ease'
    };

    return (
        <div style={{ marginTop: '20px' }}>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                margin: '20px 0',
                color: 'var(--color-text-muted)',
                fontSize: '0.8rem'
            }}>
                <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.1)' }}></div>
                <span>Or continue with</span>
                <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.1)' }}></div>
            </div>

            <button onClick={() => handleSocialLogin('google')} style={buttonStyle} className="social-btn">
                <span>Google</span>
            </button>
            <button onClick={() => handleSocialLogin('facebook')} style={buttonStyle} className="social-btn">
                <span>Facebook</span>
            </button>
            <button onClick={() => handleSocialLogin('linkedin')} style={buttonStyle} className="social-btn">
                <span>LinkedIn</span>
            </button>
        </div>
    );
};

export default SocialLogin;
