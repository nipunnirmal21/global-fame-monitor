import { useState, useEffect, useCallback, useRef } from 'react';
import { useAuth } from '../context/AuthContext';

const API_URL = 'http://localhost:5000/api';
const DEBOUNCE_MS = 300; // Minimum time between votes per celebrity

export const useVotesApi = () => {
    const { isAuthenticated, token } = useAuth();
    const [votes, setVotes] = useState({});
    const [userVotes, setUserVotes] = useState({});
    const [animatingId, setAnimatingId] = useState(null);
    const [animationType, setAnimationType] = useState(null);
    const [loading, setLoading] = useState(true);

    // Debouncing: Track last vote time per celebrity
    const lastVoteTimeRef = useRef({});
    // Track in-flight requests to prevent duplicate submissions
    const inFlightRef = useRef({});

    // Fetch all votes on mount
    useEffect(() => {
        const fetchAllVotes = async () => {
            try {
                const res = await fetch(`${API_URL}/votes/all`);
                if (res.ok) {
                    const data = await res.json();
                    setVotes(data);
                }
            } catch (err) {
                console.error('Failed to fetch votes:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchAllVotes();
    }, []);

    // Fetch user's votes when authenticated
    useEffect(() => {
        if (!isAuthenticated || !token) {
            setUserVotes({});
            return;
        }

        const fetchUserVotes = async () => {
            try {
                const res = await fetch(`${API_URL}/votes/user-all`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                if (res.ok) {
                    const data = await res.json();
                    setUserVotes(data);
                }
            } catch (err) {
                console.error('Failed to fetch user votes:', err);
            }
        };

        fetchUserVotes();
    }, [isAuthenticated, token]);

    const getVotes = useCallback((id) => {
        return votes[id] || { likes: 0, dislikes: 0 };
    }, [votes]);

    const getUserVote = useCallback((id) => {
        return userVotes[id] || null;
    }, [userVotes]);

    const submitVote = async (id, type) => {
        // STRICT AUTH GUARD: Never allow voting if not authenticated
        if (!isAuthenticated || !token) {
            console.warn('Vote blocked: User not authenticated');
            return { success: false, reason: 'not_authenticated' };
        }

        // DEBOUNCE CHECK: Prevent rapid clicks on same celebrity
        const now = Date.now();
        const lastVoteTime = lastVoteTimeRef.current[id] || 0;
        if (now - lastVoteTime < DEBOUNCE_MS) {
            console.log('Vote debounced: Too fast');
            return { success: false, reason: 'debounced' };
        }

        // IN-FLIGHT CHECK: Prevent duplicate concurrent requests
        if (inFlightRef.current[id]) {
            console.log('Vote blocked: Request already in flight');
            return { success: false, reason: 'in_flight' };
        }

        // Mark this celebrity as having an in-flight request
        inFlightRef.current[id] = true;
        lastVoteTimeRef.current[id] = now;

        // Store previous state for rollback
        const previousVotes = { ...votes[id] };
        const previousUserVote = userVotes[id];

        setAnimatingId(id);
        setAnimationType(type);

        // Optimistic UI update
        const currentUserVote = userVotes[id];
        if (currentUserVote === type) {
            // Removing vote - optimistically update
            setVotes(prev => ({
                ...prev,
                [id]: {
                    ...prev[id],
                    [type === 'like' ? 'likes' : 'dislikes']: Math.max(0, (prev[id]?.[type === 'like' ? 'likes' : 'dislikes'] || 0) - 1)
                }
            }));
            setUserVotes(prev => {
                const newVotes = { ...prev };
                delete newVotes[id];
                return newVotes;
            });
        } else if (currentUserVote) {
            // Switching vote - optimistically update
            setVotes(prev => ({
                ...prev,
                [id]: {
                    likes: type === 'like' ? (prev[id]?.likes || 0) + 1 : Math.max(0, (prev[id]?.likes || 0) - 1),
                    dislikes: type === 'dislike' ? (prev[id]?.dislikes || 0) + 1 : Math.max(0, (prev[id]?.dislikes || 0) - 1)
                }
            }));
            setUserVotes(prev => ({ ...prev, [id]: type }));
        } else {
            // New vote - optimistically update
            setVotes(prev => ({
                ...prev,
                [id]: {
                    ...prev[id],
                    [type === 'like' ? 'likes' : 'dislikes']: (prev[id]?.[type === 'like' ? 'likes' : 'dislikes'] || 0) + 1
                }
            }));
            setUserVotes(prev => ({ ...prev, [id]: type }));
        }

        try {
            const res = await fetch(`${API_URL}/votes`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ celebrityId: id, type })
            });

            if (!res.ok) {
                // ROLLBACK on error
                console.error('Vote failed, rolling back');
                setVotes(prev => ({ ...prev, [id]: previousVotes }));
                if (previousUserVote) {
                    setUserVotes(prev => ({ ...prev, [id]: previousUserVote }));
                } else {
                    setUserVotes(prev => {
                        const newVotes = { ...prev };
                        delete newVotes[id];
                        return newVotes;
                    });
                }

                if (res.status === 401) {
                    return { success: false, reason: 'not_authenticated' };
                }
                return { success: false, reason: 'server_error' };
            }

            const data = await res.json();
            return { success: true, action: data.action };
        } catch (err) {
            // ROLLBACK on network error
            console.error('Vote network error, rolling back:', err);
            setVotes(prev => ({ ...prev, [id]: previousVotes }));
            if (previousUserVote) {
                setUserVotes(prev => ({ ...prev, [id]: previousUserVote }));
            } else {
                setUserVotes(prev => {
                    const newVotes = { ...prev };
                    delete newVotes[id];
                    return newVotes;
                });
            }
            return { success: false, reason: 'network_error' };
        } finally {
            // Clear in-flight flag
            inFlightRef.current[id] = false;
            setTimeout(() => {
                setAnimatingId(null);
                setAnimationType(null);
            }, 300);
        }
    };

    const addLike = useCallback((id) => submitVote(id, 'like'), [isAuthenticated, token, userVotes, votes]);
    const addDislike = useCallback((id) => submitVote(id, 'dislike'), [isAuthenticated, token, userVotes, votes]);

    const isAnimating = useCallback((id, type) => {
        return animatingId === id && animationType === type;
    }, [animatingId, animationType]);

    const getTotalVotes = useCallback(() => {
        return Object.values(votes).reduce((acc, v) => ({
            likes: acc.likes + (v.likes || 0),
            dislikes: acc.dislikes + (v.dislikes || 0)
        }), { likes: 0, dislikes: 0 });
    }, [votes]);

    return {
        getVotes,
        getUserVote,
        addLike,
        addDislike,
        isAnimating,
        getTotalVotes,
        loading,
        isAuthenticated
    };
};

