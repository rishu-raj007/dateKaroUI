import { Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { authService } from '../services/api';

const ProtectedRoute = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkUser = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                setLoading(false);
                return;
            }
            const profile = await authService.getCurrentUser();
            setUser(profile);
            setLoading(false);
        };
        checkUser();
    }, []);

    if (loading) {
        return <div style={{ color: 'white', textAlign: 'center', marginTop: '100px' }}>Loading...</div>;
    }

    if (!localStorage.getItem('token')) {
        return <Navigate to="/signin" replace />;
    }

    return children;
};

export default ProtectedRoute;
