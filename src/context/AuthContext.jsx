import { createContext, useContext, useState, useEffect } from 'react';

const API_URL = 'http://localhost:5000/api';
const TOKEN_KEY = 'gfm-auth-token';
const USER_KEY = 'gfm-auth-user';

const AuthContext = createContext(null);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem(USER_KEY);
        return savedUser ? JSON.parse(savedUser) : null;
    });
    const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY));
    const [loading, setLoading] = useState(false);
    const [initializing, setInitializing] = useState(!!localStorage.getItem(TOKEN_KEY));
    const [error, setError] = useState(null);

    // Persist auth state
    useEffect(() => {
        if (token) {
            localStorage.setItem(TOKEN_KEY, token);
        } else {
            localStorage.removeItem(TOKEN_KEY);
        }
    }, [token]);

    useEffect(() => {
        if (user) {
            localStorage.setItem(USER_KEY, JSON.stringify(user));
        } else {
            localStorage.removeItem(USER_KEY);
        }
    }, [user]);

    // Refresh user profile (including admin status) on load
    useEffect(() => {
        const bootstrapAuth = async () => {
            if (!token) {
                setInitializing(false);
                return;
            }

            try {
                const res = await fetch(`${API_URL}/auth/me`, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                if (res.ok) {
                    const data = await res.json();
                    setUser({
                        _id: data._id,
                        username: data.username,
                        isAdmin: data.isAdmin
                    });
                } else {
                    setToken(null);
                    setUser(null);
                }
            } catch (err) {
                console.error('Failed to bootstrap auth:', err);
            } finally {
                setInitializing(false);
            }
        };

        bootstrapAuth();
    }, [token]);

    const login = async (username, password) => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch(`${API_URL}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });
            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.message || 'Login failed');
            }
            setToken(data.token);
            setUser({ _id: data._id, username: data.username, isAdmin: data.isAdmin });
            return { success: true };
        } catch (err) {
            setError(err.message);
            return { success: false, error: err.message };
        } finally {
            setLoading(false);
        }
    };

    const register = async (username, password) => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch(`${API_URL}/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });
            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.message || 'Registration failed');
            }
            setToken(data.token);
            setUser({ _id: data._id, username: data.username, isAdmin: data.isAdmin });
            return { success: true };
        } catch (err) {
            setError(err.message);
            return { success: false, error: err.message };
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        setToken(null);
        setUser(null);
        setError(null);
    };

    const value = {
        user,
        token,
        loading,
        initializing,
        error,
        isAuthenticated: !!token,
        isAdmin: !!user?.isAdmin,
        login,
        register,
        logout,
        clearError: () => setError(null)
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
