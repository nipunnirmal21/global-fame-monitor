import ProfileCard from './ProfileCard';
import { getTop10 } from '../data/famousPeople';

export default function HeroSection({ votes, getUserVote, onLike, onDislike, isAnimating }) {
    const top10 = getTop10();

    return (
        <section className="py-12 px-4 bg-gradient-to-b from-blue-50/50 to-white">
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-10">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full text-white text-sm font-medium mb-4 shadow-lg">
                        <span>⭐</span>
                        <span>Global Rankings 2026</span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
                        Top 10 Most Famous People
                    </h2>
                    <p className="text-gray-500 max-w-2xl mx-auto">
                        Cast your vote on the world's most influential personalities.
                        Your vote counts exclusively on this platform.
                    </p>
                </div>

                {/* Top 10 Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                    {top10.map((person) => (
                        <ProfileCard
                            key={person.id}
                            person={person}
                            votes={votes(person.id)}
                            userVote={getUserVote(person.id)}
                            onLike={onLike}
                            onDislike={onDislike}
                            isLikeAnimating={isAnimating(person.id, 'like')}
                            isDislikeAnimating={isAnimating(person.id, 'dislike')}
                            featured={true}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
