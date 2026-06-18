import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { famousPeople, generateSlug } from '../data/famousPeople';
import ShareButton from '../components/ShareButton';

const API_URL = 'http://localhost:5000/api';

export default function ProfilePage() {
    const { slug } = useParams();
    const navigate = useNavigate();
    const { isAuthenticated, token } = useAuth();

    const [celebrity, setCelebrity] = useState(null);
    const [wikiData, setWikiData] = useState(null);
    const [votes, setVotes] = useState({ likes: 0, dislikes: 0 });
    const [userVote, setUserVote] = useState(null);
    const [loading, setLoading] = useState(true);
    const [imageLoaded, setImageLoaded] = useState(false);
    const [imageError, setImageError] = useState(false);
    const [isVoting, setIsVoting] = useState(false);

    // Find celebrity from local data
    useEffect(() => {
        const found = famousPeople.find(p => generateSlug(p.name) === slug);
        if (found) {
            setCelebrity(found);
        } else {
            navigate('/');
        }
    }, [slug, navigate]);

    // Fetch Wikipedia data
    useEffect(() => {
        if (!celebrity) return;

        const fetchWikiData = async () => {
            try {
                const res = await fetch(`${API_URL}/celebrities/${slug}`);
                if (res.ok) {
                    const data = await res.json();
                    setWikiData(data);
                }
            } catch (err) {
                console.error('Failed to fetch wiki data:', err);
            }
        };

        fetchWikiData();
    }, [celebrity, slug]);

    // Fetch votes
    useEffect(() => {
        if (!celebrity) return;

        const fetchVotes = async () => {
            try {
                const res = await fetch(`${API_URL}/votes/celebrity/${celebrity.id}`);
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

        fetchVotes();
    }, [celebrity]);

    // Fetch user's vote if authenticated
    useEffect(() => {
        if (!celebrity || !isAuthenticated) {
            setUserVote(null);
            return;
        }

        const fetchUserVote = async () => {
            try {
                const res = await fetch(`${API_URL}/votes/user/${celebrity.id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                if (res.ok) {
                    const data = await res.json();
                    setUserVote(data.hasVoted ? data.type : null);
                }
            } catch (err) {
                console.error('Failed to fetch user vote:', err);
            }
        };

        fetchUserVote();
    }, [celebrity, isAuthenticated, token]);

    const handleVote = async (type) => {
        if (!isAuthenticated) {
            navigate('/login');
            return;
        }
        if (isVoting) return;

        setIsVoting(true);
        try {
            const res = await fetch(`${API_URL}/votes`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ celebrityId: celebrity.id, type })
            });

            if (res.ok) {
                const data = await res.json();

                // Update local vote counts
                if (data.action === 'created') {
                    setVotes(prev => ({
                        ...prev,
                        [type === 'like' ? 'likes' : 'dislikes']: prev[type === 'like' ? 'likes' : 'dislikes'] + 1
                    }));
                    setUserVote(type);
                } else if (data.action === 'removed') {
                    setVotes(prev => ({
                        ...prev,
                        [type === 'like' ? 'likes' : 'dislikes']: prev[type === 'like' ? 'likes' : 'dislikes'] - 1
                    }));
                    setUserVote(null);
                } else if (data.action === 'updated') {
                    const opposite = type === 'like' ? 'dislikes' : 'likes';
                    setVotes(prev => ({
                        likes: type === 'like' ? prev.likes + 1 : prev.likes - 1,
                        dislikes: type === 'dislike' ? prev.dislikes + 1 : prev.dislikes - 1
                    }));
                    setUserVote(type);
                }
            }
        } catch (err) {
            console.error('Vote error:', err);
        } finally {
            setIsVoting(false);
        }
    };

    const getImageUrl = (name) => {
        const formatted = name.replace(/ /g, '_');
        return `https://en.wikipedia.org/wiki/Special:FilePath/${formatted}_(cropped).jpg?width=600`;
    };

    const getFallbackImage = (name) => {
        const initials = name.split(' ').map(n => n[0]).join('').slice(0, 2);
        const colors = [
            'from-blue-500 to-purple-600',
            'from-green-500 to-teal-600',
            'from-orange-500 to-red-600',
        ];
        return { initials, gradient: colors[name.length % colors.length] };
    };

    if (!celebrity) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full" />
            </div>
        );
    }

    const fallback = getFallbackImage(celebrity.name);

    const categoryBadges = {
        sports: { label: 'Sports', bg: 'bg-blue-100', text: 'text-blue-700', icon: '⚽' },
        music: { label: 'Music', bg: 'bg-purple-100', text: 'text-purple-700', icon: '🎵' },
        film: { label: 'Film & TV', bg: 'bg-amber-100', text: 'text-amber-700', icon: '🎬' },
        business: { label: 'Business', bg: 'bg-emerald-100', text: 'text-emerald-700', icon: '💼' },
        politics: { label: 'Historical', bg: 'bg-rose-100', text: 'text-rose-700', icon: '🏛️' },
    };

    const badge = categoryBadges[celebrity.category] || categoryBadges.sports;

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
                <div className="max-w-5xl mx-auto px-4 py-4 flex items-center gap-4">
                    <Link
                        to="/"
                        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        <span className="font-medium">Back</span>
                    </Link>
                    <div className="flex-1" />
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow">
                            <span className="text-white text-sm">🌍</span>
                        </div>
                        <span className="font-semibold text-gray-900 hidden sm:block">Global Fame Monitor</span>
                    </div>
                </div>
            </header>

            {/* Profile Content */}
            <main className="max-w-5xl mx-auto px-4 py-8">
                <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
                    {/* Image Section */}
                    <div className="relative aspect-[16/9] md:aspect-[21/9] bg-gray-100">
                        {!imageLoaded && !imageError && (
                            <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200" />
                        )}

                        {imageError && (
                            <div className={`absolute inset-0 bg-gradient-to-br ${fallback.gradient} flex items-center justify-center`}>
                                <span className="text-white text-8xl font-bold opacity-80">{fallback.initials}</span>
                            </div>
                        )}

                        <img
                            src={wikiData?.originalImage || getImageUrl(celebrity.name)}
                            alt={celebrity.name}
                            onLoad={() => setImageLoaded(true)}
                            onError={() => setImageError(true)}
                            className={`w-full h-full object-cover object-top ${imageLoaded && !imageError ? 'opacity-100' : 'opacity-0'}`}
                        />

                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                        {/* Category Badge */}
                        <div className="absolute top-4 left-4">
                            <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium ${badge.bg} ${badge.text} shadow-lg backdrop-blur-sm`}>
                                <span>{badge.icon}</span>
                                <span>{badge.label}</span>
                            </span>
                        </div>
                    </div>

                    {/* Info Section */}
                    <div className="p-6 md:p-8">
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                            {celebrity.name}
                        </h1>

                        {wikiData?.description && (
                            <p className="text-lg text-gray-500 mb-6">{wikiData.description}</p>
                        )}

                        {/* Biography */}
                        <div className="prose prose-lg max-w-none text-gray-600 mb-8">
                            <p>{wikiData?.extract || celebrity.bio}</p>
                        </div>

                        {wikiData?.wikiUrl && (
                            <a
                                href={wikiData.wikiUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium mb-8"
                            >
                                Read more on Wikipedia
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                            </a>
                        )}

                        {/* Voting Section */}
                        <div className="border-t border-gray-100 pt-8">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4">Community Votes</h2>

                            <div className="flex flex-wrap items-center gap-4">
                                {/* Like Button */}
                                <button
                                    onClick={() => handleVote('like')}
                                    disabled={isVoting}
                                    className={`flex items-center gap-3 px-6 py-3 rounded-xl font-medium transition-all duration-200 ${userVote === 'like'
                                            ? 'bg-green-500 text-white shadow-lg shadow-green-200'
                                            : 'bg-gray-50 hover:bg-green-50 text-gray-600 hover:text-green-600 border border-gray-200 hover:border-green-200'
                                        } ${isVoting ? 'opacity-50 cursor-not-allowed' : ''}`}
                                >
                                    <span className="text-xl">👍</span>
                                    <span className="text-lg font-semibold">{votes.likes.toLocaleString()}</span>
                                    {userVote === 'like' && <span className="text-sm">Liked</span>}
                                </button>

                                {/* Dislike Button */}
                                <button
                                    onClick={() => handleVote('dislike')}
                                    disabled={isVoting}
                                    className={`flex items-center gap-3 px-6 py-3 rounded-xl font-medium transition-all duration-200 ${userVote === 'dislike'
                                            ? 'bg-red-500 text-white shadow-lg shadow-red-200'
                                            : 'bg-gray-50 hover:bg-red-50 text-gray-600 hover:text-red-600 border border-gray-200 hover:border-red-200'
                                        } ${isVoting ? 'opacity-50 cursor-not-allowed' : ''}`}
                                >
                                    <span className="text-xl">👎</span>
                                    <span className="text-lg font-semibold">{votes.dislikes.toLocaleString()}</span>
                                    {userVote === 'dislike' && <span className="text-sm">Disliked</span>}
                                </button>

                                <ShareButton name={celebrity.name} slug={slug} />
                            </div>

                            {!isAuthenticated && (
                                <p className="mt-4 text-sm text-gray-500">
                                    <Link to="/login" className="text-blue-600 hover:underline">Sign in</Link> to vote for {celebrity.name}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
