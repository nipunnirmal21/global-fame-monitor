import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import VoteButton from './VoteButton';
import ShareButton from './ShareButton';
import { generateSlug } from '../data/famousPeople';
import { useAuth } from '../context/AuthContext';
import { useToast } from './ToastProvider';

// Default safe votes object
const DEFAULT_VOTES = { likes: 0, dislikes: 0 };

export default function ProfileCard({ person, votes = DEFAULT_VOTES, onLike, onDislike, isLikeAnimating, isDislikeAnimating, userVote = null, featured = false }) {
    const [imageLoaded, setImageLoaded] = useState(false);
    const [imageError, setImageError] = useState(false);
    const { isAuthenticated } = useAuth();
    const { showToast } = useToast();
    const navigate = useNavigate();

    // Null-safe votes with defaults
    const safeVotes = votes || DEFAULT_VOTES;

    // Generate Wikipedia image URL
    const getImageUrl = (name) => {
        const formatted = name.replace(/ /g, '_');
        return `https://en.wikipedia.org/wiki/Special:FilePath/${formatted}_(cropped).jpg?width=400`;
    };

    // Fallback image with initials
    const getFallbackImage = (name) => {
        const initials = name.split(' ').map(n => n[0]).join('').slice(0, 2);
        const colors = [
            'from-blue-500 to-purple-600',
            'from-green-500 to-teal-600',
            'from-orange-500 to-red-600',
            'from-pink-500 to-rose-600',
            'from-indigo-500 to-blue-600',
        ];
        const colorIndex = name.length % colors.length;
        return { initials, gradient: colors[colorIndex] };
    };

    const fallback = getFallbackImage(person.name);
    const profileSlug = generateSlug(person.name);

    const categoryBadges = {
        sports: { label: 'Sports', bg: 'bg-blue-100', text: 'text-blue-700', icon: '⚽' },
        music: { label: 'Music', bg: 'bg-purple-100', text: 'text-purple-700', icon: '🎵' },
        film: { label: 'Film & TV', bg: 'bg-amber-100', text: 'text-amber-700', icon: '🎬' },
        business: { label: 'Business', bg: 'bg-emerald-100', text: 'text-emerald-700', icon: '💼' },
        politics: { label: 'Historical', bg: 'bg-rose-100', text: 'text-rose-700', icon: '🏛️' },
    };

    const badge = categoryBadges[person.category] || categoryBadges.sports;

    // Handle vote click with auth check
    const handleVoteClick = (type) => {
        if (!isAuthenticated) {
            showToast('Please login to vote', 'warning', {
                label: 'Login',
                onClick: () => navigate('/login')
            });
            return;
        }

        if (type === 'like') {
            onLike(person.id);
        } else {
            onDislike(person.id);
        }
    };

    return (
        <div
            className={`group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-gray-200 ${featured ? 'ring-2 ring-blue-100 ring-offset-2' : ''
                }`}
        >
            {/* Image Section - Clickable Link */}
            <Link to={`/profile/${profileSlug}`} className="block relative overflow-hidden bg-gray-100 aspect-[4/3] cursor-pointer">
                {/* Loading Placeholder */}
                {!imageLoaded && !imageError && (
                    <div className="absolute inset-0 image-placeholder" />
                )}

                {/* Fallback with initials */}
                {imageError && (
                    <div className={`absolute inset-0 bg-gradient-to-br ${fallback.gradient} flex items-center justify-center`}>
                        <span className="text-white text-4xl font-bold opacity-80">
                            {fallback.initials}
                        </span>
                    </div>
                )}

                {/* Actual Image */}
                <img
                    src={getImageUrl(person.name)}
                    alt={person.name}
                    onLoad={() => setImageLoaded(true)}
                    onError={() => setImageError(true)}
                    className={`w-full h-full object-cover object-top transition-all duration-500 group-hover:scale-110 ${imageLoaded && !imageError ? 'opacity-100' : 'opacity-0'
                        }`}
                />

                {/* Category Badge */}
                <div className="absolute top-3 left-3">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${badge.bg} ${badge.text} shadow-sm backdrop-blur-sm`}>
                        <span>{badge.icon}</span>
                        <span className="hidden sm:inline">{badge.label}</span>
                    </span>
                </div>

                {/* Featured Badge */}
                {featured && (
                    <div className="absolute top-3 right-3">
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-amber-400 to-orange-500 text-white shadow-lg">
                            ⭐ Top 10
                        </span>
                    </div>
                )}

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 px-4 py-2 rounded-full text-sm font-medium text-gray-800 shadow-lg">
                        View Profile →
                    </span>
                </div>

                {/* Gradient Overlay */}
                <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/30 to-transparent" />
            </Link>

            {/* Content Section */}
            <div className="p-4">
                {/* Name - Also Clickable */}
                <Link to={`/profile/${profileSlug}`}>
                    <h3 className={`font-bold text-gray-900 mb-1 truncate hover:text-blue-600 transition-colors ${featured ? 'text-lg' : 'text-base'}`}>
                        {person.name}
                    </h3>
                </Link>

                {/* Bio */}
                <p className="text-sm text-gray-500 line-clamp-2 mb-4 min-h-[2.5rem]">
                    {person.bio}
                </p>

                {/* Vote Buttons with Auth Guard */}
                <div className="flex items-center gap-2">
                    <VoteButton
                        type="like"
                        count={safeVotes.likes}
                        onClick={() => handleVoteClick('like')}
                        isAnimating={isLikeAnimating}
                        isActive={userVote === 'like'}
                        locked={!isAuthenticated}
                    />
                    <VoteButton
                        type="dislike"
                        count={safeVotes.dislikes}
                        onClick={() => handleVoteClick('dislike')}
                        isAnimating={isDislikeAnimating}
                        isActive={userVote === 'dislike'}
                        locked={!isAuthenticated}
                    />
                    <ShareButton name={person.name} slug={profileSlug} size="sm" className="ml-auto" />
                </div>

                {/* Login Prompt for Guests */}
                {!isAuthenticated && (
                    <p className="mt-2 text-xs text-gray-400 flex items-center gap-1">
                        <span>🔒</span>
                        <Link to="/login" className="text-blue-500 hover:underline">Login</Link>
                        <span>to vote</span>
                    </p>
                )}
            </div>
        </div>
    );
}
