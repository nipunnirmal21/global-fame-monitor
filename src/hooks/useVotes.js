import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'global-fame-monitor-votes';

// Initialize votes for all 250 people with baseline of 0
const initializeVotes = () => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
        return JSON.parse(stored);
    }
    return {};
};

export const useVotes = () => {
    const [votes, setVotes] = useState(initializeVotes);
    const [animatingId, setAnimatingId] = useState(null);
    const [animationType, setAnimationType] = useState(null);

    // Persist votes to localStorage whenever they change
    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(votes));
    }, [votes]);

    const getVotes = useCallback((id) => {
        return votes[id] || { likes: 0, dislikes: 0 };
    }, [votes]);

    const addLike = useCallback((id) => {
        setAnimatingId(id);
        setAnimationType('like');

        setVotes(prev => ({
            ...prev,
            [id]: {
                likes: (prev[id]?.likes || 0) + 1,
                dislikes: prev[id]?.dislikes || 0
            }
        }));

        // Clear animation after 300ms
        setTimeout(() => {
            setAnimatingId(null);
            setAnimationType(null);
        }, 300);
    }, []);

    const addDislike = useCallback((id) => {
        setAnimatingId(id);
        setAnimationType('dislike');

        setVotes(prev => ({
            ...prev,
            [id]: {
                likes: prev[id]?.likes || 0,
                dislikes: (prev[id]?.dislikes || 0) + 1
            }
        }));

        // Clear animation after 300ms
        setTimeout(() => {
            setAnimatingId(null);
            setAnimationType(null);
        }, 300);
    }, []);

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
        addLike,
        addDislike,
        isAnimating,
        getTotalVotes
    };
};
