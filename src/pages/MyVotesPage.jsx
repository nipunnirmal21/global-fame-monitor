import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { famousPeople, generateSlug } from '../data/famousPeople';

const API_URL = 'http://localhost:5000/api';

export default function MyVotesPage() {
    const navigate = useNavigate();
    const { isAuthenticated, token, user } = useAuth();
    const [voteHistory, setVoteHistory] = useState([]);
    const [loading, setLoading] = useState(true);

    // Redirect if not authenticated
    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
        }
    }, [isAuthenticated, navigate]);

    // Fetch vote history
    useEffect(() => {
        if (!isAuthenticated || !token) return;

        const fetchHistory = async () => {
            try {
                const res = await fetch(`${API_URL}/votes/user-history`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                if (res.ok) {
                    const data = await res.json();
                    // Enrich with celebrity data
                    const enrichedData = data.map(vote => {
                        const celebrity = famousPeople.find(p => p.id === vote.celebrityId);
                        return {
                            ...vote,
                            celebrity: celebrity || { name: 'Unknown', category: 'unknown' }
                        };
                    });
                    setVoteHistory(enrichedData);
                }
            } catch (err) {
                console.error('Failed to fetch vote history:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchHistory();
    }, [isAuthenticated, token]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const categoryBadges = {
        sports: { bg: 'bg-blue-100', text: 'text-blue-700', icon: '⚽' },
        music: { bg: 'bg-purple-100', text: 'text-purple-700', icon: '🎵' },
        film: { bg: 'bg-amber-100', text: 'text-amber-700', icon: '🎬' },
        business: { bg: 'bg-emerald-100', text: 'text-emerald-700', icon: '💼' },
        politics: { bg: 'bg-rose-100', text: 'text-rose-700', icon: '🏛️' },
        unknown: { bg: 'bg-gray-100', text: 'text-gray-700', icon: '❓' }
    };

    if (!isAuthenticated) {
        return null;
    }

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

            {/* Main Content */}
            <main className="max-w-4xl mx-auto px-4 py-8">
                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                    {/* Page Header */}
                    <div className="bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-8 text-white">
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 bg-white/20 backdrop-blur rounded-full flex items-center justify-center">
                                <span className="text-3xl">📊</span>
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold">My Vote History</h1>
                                <p className="text-white/80 mt-1">
                                    {user?.username ? `@${user.username}` : 'Your activity'}
                                </p>
                            </div>
                        </div>
                        <div className="mt-4 flex gap-4 text-sm">
                            <div className="bg-white/20 backdrop-blur px-3 py-1 rounded-full">
                                {voteHistory.length} total votes
                            </div>
                            <div className="bg-green-400/30 px-3 py-1 rounded-full">
                                👍 {voteHistory.filter(v => v.type === 'like').length} likes
                            </div>
                            <div className="bg-red-400/30 px-3 py-1 rounded-full">
                                👎 {voteHistory.filter(v => v.type === 'dislike').length} dislikes
                            </div>
                        </div>
                    </div>

                    {/* Vote List */}
                    <div className="p-6">
                        {loading ? (
                            <div className="flex items-center justify-center py-12">
                                <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full" />
                            </div>
                        ) : voteHistory.length === 0 ? (
                            <div className="text-center py-12">
                                <div className="text-6xl mb-4">🗳️</div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">No votes yet</h3>
                                <p className="text-gray-500 mb-6">
                                    Start voting on your favorite celebrities to see your history here!
                                </p>
                                <Link
                                    to="/"
                                    className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-medium hover:shadow-lg transition-all"
                                >
                                    Explore Celebrities
                                </Link>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {voteHistory.map((vote) => {
                                    const badge = categoryBadges[vote.celebrity.category] || categoryBadges.unknown;
                                    return (
                                        <Link
                                            key={vote._id}
                                            to={`/profile/${generateSlug(vote.celebrity.name)}`}
                                            className="flex items-center gap-4 p-4 rounded-xl border border-gray-100 hover:border-blue-200 hover:bg-blue-50/50 transition-all group"
                                        >
                                            {/* Vote Type Icon */}
                                            <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl ${vote.type === 'like'
                                                    ? 'bg-green-100 text-green-600'
                                                    : 'bg-red-100 text-red-600'
                                                }`}>
                                                {vote.type === 'like' ? '👍' : '👎'}
                                            </div>

                                            {/* Celebrity Info */}
                                            <div className="flex-1 min-w-0">
                                                <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors truncate">
                                                    {vote.celebrity.name}
                                                </h3>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs ${badge.bg} ${badge.text}`}>
                                                        <span>{badge.icon}</span>
                                                        <span className="capitalize">{vote.celebrity.category}</span>
                                                    </span>
                                                    <span className="text-xs text-gray-400">•</span>
                                                    <span className="text-xs text-gray-500">
                                                        {formatDate(vote.votedAt)}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Arrow */}
                                            <svg className="w-5 h-5 text-gray-300 group-hover:text-blue-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </Link>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}
